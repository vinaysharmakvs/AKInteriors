import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
const sql = neon(process.env.DATABASE_URL);
await sql`
  CREATE TABLE IF NOT EXISTS enquiries (
    id BIGSERIAL PRIMARY KEY,
    request_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'new',
    status_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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
    source TEXT NOT NULL DEFAULT 'website',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    location_accuracy DOUBLE PRECISION
  )
`;
await sql`ALTER TABLE enquiries ALTER COLUMN location DROP NOT NULL`;
await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS request_id TEXT`;
await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`;
await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION`;
await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION`;
await sql`ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS location_accuracy DOUBLE PRECISION`;
await sql`CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC)`;
await sql`CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status)`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS enquiries_request_id_idx ON enquiries (request_id) WHERE request_id IS NOT NULL`;
const [result] = await sql`SELECT to_regclass('public.enquiries') AS table_name`;
if (result.table_name !== 'enquiries') throw new Error('The enquiries table was not created.');
console.log('Neon connection verified and enquiries table is ready.');
