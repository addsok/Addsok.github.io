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
5. Seed game data: `npm run seed`
6. Start app: `npm run dev`

## Deployment (Vercel)
1. Import repo in Vercel.
2. Set environment variables from `.env.example`.
3. Deploy.
4. Ensure Supabase redirect URLs include production and preview domains.

## Security and RLS
- `profiles`: public read, users insert/update self only.
- `user_camo_progress`: users can CRUD only own rows.
- `leaderboard_public` is a view exposing safe public fields only.
- Leaderboard score is calculated from `user_camo_progress`; no manual score input accepted.

## Data architecture
- Seasonal content lives in `data/bo7/*.ts`.
- `scripts/seed.ts` imports categories, weapons, camo groups, camos, and requirement text.
- To add seasons, append new entries to seed files and re-run `npm run seed`.
- UI pages query DB-backed tables/views only; they do not hardcode game entries.

## Routes
- `/` home
- `/signup`, `/login`
- `/dashboard`
- `/weapons` and `/weapons/[weaponId]`
- `/categories`
- `/leaderboard`
- `/profile`
- `/u/[username]` public profile
- `/admin/import` admin-only seed/import instructions

## Future expansion support
Schema is normalized for future BO7 Multiplayer/Zombies/Warzone modes:
- add optional `mode` columns to `weapons` and/or `camos`
- keep same `user_camo_progress` tracking and leaderboard aggregations
- seasonal imports stay data-only via `data/bo7/*`
