import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import enquiryHandler from './api/enquiries.js';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.json': 'application/json'
};

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/enquiries') return enquiryHandler(req, res);

  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const safePath = normalize(decodeURIComponent(requested)).replace(/^(\.\.(\/|\\|$))+/, '');
  const filePath = join(root, safePath);
  if (!filePath.startsWith(root) || !existsSync(filePath) || !statSync(filePath).isFile()) {
    res.statusCode = 404;
    return res.end('Not found');
  }
  res.setHeader('Content-Type', mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream');
  createReadStream(filePath).pipe(res);
}).listen(port, () => {
  console.log(`AK Interiors running at http://localhost:${port}`);
});
