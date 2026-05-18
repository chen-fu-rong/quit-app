# Quit — E-Cigarette Tracker

This is a Next.js (App Router) project scaffolded with Tailwind CSS and Supabase.

## Setup
1. Create a Supabase project and get the following keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Copy `.env.example` to `.env.local` and fill values.

3. Apply the database schema located at `db/supabase_schema.sql` using the Supabase SQL editor.

4. Install dependencies and run locally:

```bash
cd quit-app
npm install
npm run dev
```

## Deploying to Vercel
1. Push this repo to GitHub, GitLab, or another Git provider.
2. Create a new project in Vercel and connect the repository.
3. Add the following environment variables in Vercel (Project Settings > Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Set the build command to `npm run build` and the output directory to `.next` (Vercel usually detects this automatically).
5. Deploy.

## Notes
- The app uses Supabase Auth for authentication. Sign up / login under `/auth/login`.
- Client components call server API routes under `/api/` which forward requests to Supabase using the user's access token.
- `npm run build` is verified to succeed with the current code and auth pages are configured as dynamic client-only routes.

*** End of README
