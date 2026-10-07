import { randomBytes } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { neon, neonConfig } from '@neondatabase/serverless';

const execFileAsync = promisify(execFile);
const nativeFetch = globalThis.fetch;

async function fetchWithCurl(url, options = {}, originalError) {
    const headers = new Headers(options.headers || {});
    const connectionString = headers.get('neon-connection-string');
    let targetUrl = String(url);
    if (connectionString && new URL(targetUrl).hostname.startsWith('api.')) {
      targetUrl = `https://${new URL(connectionString).host}/sql`;
    }
    const args = ['-sS', '--connect-timeout', '15', '--max-time', '30', '-X', options.method || 'GET', targetUrl];
    headers.forEach((value, key) => args.push('-H', `${key}: ${value}`));
    if (options.body != null) args.push('--data-binary', String(options.body));
    args.push('-w', '\n__AK_HTTP_STATUS__:%{http_code}');
    const { stdout } = await execFileAsync('curl', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const marker = '\n__AK_HTTP_STATUS__:';
    const markerIndex = stdout.lastIndexOf(marker);
    if (markerIndex < 0) throw originalError || new Error('Database HTTP response was incomplete.');
    const body = stdout.slice(0, markerIndex);
    const status = Number(stdout.slice(markerIndex + marker.length)) || 500;
    return new Response(body, { status, headers: { 'content-type': 'application/json' } });
}

async function fetchWithLocalFallback(url, options = {}) {
  if (!process.env.VERCEL && process.env.NEON_USE_CURL === '1') {
    return fetchWithCurl(url, options);
  }
  try {
    return await nativeFetch(url, options);
  } catch (error) {
    if (process.env.VERCEL || process.env.NEON_DISABLE_CURL_FALLBACK === '1') throw error;
    return fetchWithCurl(url, options, error);
  }
}

neonConfig.fetchFunction = fetchWithLocalFallback;

let schemaReady;
const allowedStatuses = ['new', 'reviewing', 'contacted', 'visit_scheduled', 'quotation', 'approved', 'in_progress', 'completed', 'closed'];

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  if (req.body) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function clean(value, maxLength = 1000) {
  return String(value ?? '').trim().slice(0, maxLength);
}

function hasAdminAccess(req) {
  const supplied = clean(req.headers?.['x-admin-key'], 200);
  return Boolean(process.env.ADMIN_KEY && supplied && supplied === process.env.ADMIN_KEY);
}

function createRequestId() {
  return `AKI-${new Date().getFullYear()}-${randomBytes(5).toString('hex').toUpperCase()}`;
}

async function ensureSchema(sql) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS enquiries (
          id BIGSERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          status TEXT NOT NULL DEFAULT 'new',
          customer_name TEXT NOT NULL,
          mobile TEXT NOT NULL,
          email TEXT,
          service TEXT NOT NULL,
          location TEXT,
          budget_range TEXT,
          preferred_timing TEXT,
          project_details TEXT,
          plan_type TEXT,
          plan_data JSONB NOT NULL DEFAULT '{}'::jsonb,
          source TEXT NOT NULL DEFAULT 'website'
        )
      `;
      await sql`ALTER TABLE enquiries ALTER COLUMN location DROP NOT NULL`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS request_id TEXT`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`;
      await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS location_accuracy DOUBLE PRECISION`;
      await sql`CREATE UNIQUE INDEX IF NOT EXISTS enquiries_request_id_idx ON enquiries (request_id) WHERE request_id IS NOT NULL`;
      await sql`CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status)`;
    })();
  }
  await schemaReady;
}

function publicEnquiry(row) {
  return {
    requestId: row.request_id,
    status: row.status,
    service: row.service,
    location: row.location,
    createdAt: row.created_at,
    statusUpdatedAt: row.status_updated_at
  };
}

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return send(res, 503, { ok: false, message: 'Enquiry service is not configured.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await ensureSchema(sql);
    const url = new URL(req.url || '/api/enquiries', `http://${req.headers?.host || 'localhost'}`);

    if (req.method === 'GET') {
      const requestId = clean(url.searchParams.get('requestId'), 40).toUpperCase();
      if (requestId) {
        const rows = await sql`
          SELECT request_id, status, service, location, created_at, status_updated_at
          FROM enquiries WHERE request_id = ${requestId} LIMIT 1
        `;
        if (!rows.length) return send(res, 404, { ok: false, message: 'We could not find that request ID.' });
        return send(res, 200, { ok: true, enquiry: publicEnquiry(rows[0]) });
      }
      if (!hasAdminAccess(req)) return send(res, 401, { ok: false, message: 'Team access key required.' });
      const rows = await sql`
        SELECT id, request_id, created_at, status, status_updated_at, customer_name, mobile, email,
          service, location, budget_range, preferred_timing, project_details, plan_type, plan_data,
          latitude, longitude, location_accuracy
        FROM enquiries ORDER BY created_at DESC LIMIT 250
      `;
      return send(res, 200, { ok: true, enquiries: rows });
    }

    if (req.method === 'PATCH') {
      if (!hasAdminAccess(req)) return send(res, 401, { ok: false, message: 'Team access key required.' });
      const body = await readBody(req);
      const requestId = clean(body.requestId, 40).toUpperCase();
      const status = clean(body.status, 40);
      if (!requestId || !allowedStatuses.includes(status)) {
        return send(res, 400, { ok: false, message: 'A valid request ID and stage are required.' });
      }
      const rows = await sql`
        UPDATE enquiries SET status = ${status}, status_updated_at = NOW()
        WHERE request_id = ${requestId}
        RETURNING request_id, status, service, location, created_at, status_updated_at
      `;
      if (!rows.length) return send(res, 404, { ok: false, message: 'Request not found.' });
      return send(res, 200, { ok: true, enquiry: publicEnquiry(rows[0]) });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST, PATCH');
      return send(res, 405, { ok: false, message: 'Method not allowed.' });
    }

    const body = await readBody(req);
    if (body.website) return send(res, 200, { ok: true });

    const name = clean(body.name, 120);
    const mobile = clean(body.mobile, 24);
    const email = clean(body.email, 254);
    const service = clean(body.service, 120);
    const location = clean(body.location, 160);
    const budget = clean(body.budget, 80);
    const timing = clean(body.timing, 80);
    const project = clean(body.project, 5000);
    const planType = clean(body.planType, 40);
    const digits = mobile.replace(/\D/g, '');
    const latitude = clean(body.latitude) === '' ? null : Number(body.latitude);
    const longitude = clean(body.longitude) === '' ? null : Number(body.longitude);
    const accuracy = clean(body.locationAccuracy) === '' ? null : Number(body.locationAccuracy);

    if (!name || !service || digits.length < 10 || digits.length > 15) {
      return send(res, 400, { ok: false, message: 'Please provide your name, mobile number and service.' });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return send(res, 400, { ok: false, message: 'Please enter a valid email address or leave it blank.' });
    }

    const planData = body.planData && typeof body.planData === 'object' ? body.planData : {};
    const requestId = createRequestId();
    const [saved] = await sql`
      INSERT INTO enquiries (
        request_id, customer_name, mobile, email, service, location, budget_range,
        preferred_timing, project_details, plan_type, plan_data, latitude, longitude, location_accuracy
      ) VALUES (
        ${requestId}, ${name}, ${mobile}, ${email || null}, ${service}, ${location || null}, ${budget || null},
        ${timing || null}, ${project || null}, ${planType || null}, ${JSON.stringify(planData)}::jsonb,
        ${latitude !== null && Number.isFinite(latitude) ? latitude : null},
        ${longitude !== null && Number.isFinite(longitude) ? longitude : null},
        ${accuracy !== null && Number.isFinite(accuracy) ? accuracy : null}
      )
      RETURNING request_id, created_at
    `;

    return send(res, 201, { ok: true, requestId: saved.request_id, receivedAt: saved.created_at });
  } catch (error) {
    console.error('Unable to process enquiry:', error?.code || error?.name || 'Database request failed');
    return send(res, 500, { ok: false, message: 'We could not process your enquiry. Please call or WhatsApp us.' });
  }
}
