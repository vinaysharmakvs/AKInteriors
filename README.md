# AK Interiors website

## Run locally

```sh
npm install
cp .env.example .env
npm run db:init
npm run dev
```

Open `http://localhost:4173`. The enquiry form requires a mobile number, keeps email and location optional, and saves submissions to Neon PostgreSQL. Customers receive a request ID and can check its stage on `track-request.html`.

The team dashboard at `enquiry-dashboard.html` uses the private `ADMIN_KEY` from the deployment environment to load enquiries and update their stages.

## Deploy

Import the GitHub repository into Vercel and add `DATABASE_URL` and `ADMIN_KEY` as environment variables. Do not upload `.env` or `node_modules`.
