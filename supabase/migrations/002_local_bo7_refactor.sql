-- Migration for existing projects moving shared BO7 content from Supabase tables to code.

alter table if exists public.user_camo_progress drop constraint if exists user_camo_progress_camo_id_fkey;
alter table if exists public.user_camo_progress alter column camo_id type text using camo_id::text;

drop view if exists public.category_progress_summary;
drop view if exists public.weapon_progress_summary;
drop view if exists public.leaderboard_public;
drop function if exists public.get_user_rank(uuid);

drop table if exists public.camo_requirements;
drop table if exists public.camos;
drop table if exists public.camo_groups;
drop table if exists public.weapons;
drop table if exists public.weapon_categories;

drop policy if exists "read own progress" on public.user_camo_progress;
drop policy if exists "progress is readable" on public.user_camo_progress;
create policy "progress is readable" on public.user_camo_progress for select using (true);
