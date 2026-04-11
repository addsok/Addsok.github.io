# BO7 Camo Tracker

Production-ready Next.js + Supabase app for Black Ops 7 camo progression tracking.

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Supabase Auth + Postgres + RLS
- Deployable to Vercel

## Setup
1. `npm install`
2. Create Supabase project.
3. Run SQL migration from `supabase/migrations/001_init.sql` in Supabase SQL editor.
4. Copy `.env.example` to `.env.local` and fill values.
5. Start app: `npm run dev`

## Deployment (Vercel)
1. Import repo in Vercel.
2. Set environment variables from `.env.example`.
3. Deploy.
4. Ensure Supabase redirect URLs include production and preview domains.

## Security and RLS
- `profiles`: public read, users insert/update self only.
- `user_camo_progress`: users can mutate only own rows; select is public for leaderboard calculations.
- Leaderboard score is calculated from `user_camo_progress`; no manual score input accepted.

## Data architecture
- Shared BO7 categories, weapons, camos, and requirements live in `lib/bo7-data.ts`.
- Supabase stores only account + social + user progress data.
- No seed/import step is needed for shared BO7 content.

## Routes
- `/` home
- `/signup`, `/login`
- `/dashboard`
- `/weapons` and `/weapons/[weaponId]`
- `/categories`
- `/leaderboard`
- `/profile`
- `/u/[username]` public profile
- `/admin/import` deprecation notice
