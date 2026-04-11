create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  platform text not null check (platform in ('PC','PlayStation','Xbox')),
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.weapon_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists public.weapons (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.weapon_categories(id) on delete restrict,
  name text not null,
  slug text unique not null,
  level_unlock text,
  release_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.camo_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('base','special','mastery')),
  created_at timestamptz not null default now(),
  unique(name,type)
);

create table if not exists public.camos (
  id uuid primary key default gen_random_uuid(),
  weapon_id uuid not null references public.weapons(id) on delete cascade,
  camo_group_id uuid not null references public.camo_groups(id) on delete restrict,
  name text not null,
  unlock_order int not null default 0,
  created_at timestamptz not null default now(),
  unique(weapon_id,name)
);

create table if not exists public.camo_requirements (
  id uuid primary key default gen_random_uuid(),
  camo_id uuid not null unique references public.camos(id) on delete cascade,
  requirement_text text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_camo_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  camo_id uuid not null references public.camos(id) on delete cascade,
  status text not null check (status in ('locked','in_progress','completed')),
  updated_at timestamptz not null default now(),
  primary key (user_id, camo_id)
);

create table if not exists public.friends (
  user_id uuid not null references public.profiles(id) on delete cascade,
  friend_user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_user_id),
  check (user_id <> friend_user_id)
);

create or replace view public.weapon_progress_summary as
select
  p.id as user_id,
  w.id as weapon_id,
  w.name as weapon_name,
  w.release_order,
  wc.name as category_name,
  wc.slug as category_slug,
  count(c.id)::int as total_count,
  count(case when ucp.status='completed' then 1 end)::int as completed_count,
  coalesce(round((count(case when ucp.status='completed' then 1 end)::numeric / nullif(count(c.id),0))*100),0)::int as completion_pct
from public.profiles p
join public.weapons w on true
join public.weapon_categories wc on wc.id = w.category_id
join public.camos c on c.weapon_id = w.id
left join public.user_camo_progress ucp on ucp.user_id = p.id and ucp.camo_id = c.id
group by p.id,w.id,w.name,w.release_order,wc.name,wc.slug;

create or replace view public.category_progress_summary as
select user_id, category_name, category_slug, min(weapon_id) as category_id,
sum(total_count)::int as total_count,
sum(completed_count)::int as completed_count,
coalesce(round((sum(completed_count)::numeric/nullif(sum(total_count),0))*100),0)::int as completion_pct
from public.weapon_progress_summary
group by user_id,category_name,category_slug;

create or replace view public.leaderboard_public as
select
  p.id as user_id,
  p.username,
  p.platform,
  count(case when ucp.status='completed' then 1 end)::int as completed_count,
  coalesce(round((count(case when ucp.status='completed' then 1 end)::numeric/nullif((select count(*) from public.camos),0))*100),0)::int as completion_pct,
  count(case when ucp.status='completed' and cg.type='mastery' then 1 end)::int as mastery_count,
  max(ucp.updated_at) as last_updated
from public.profiles p
left join public.user_camo_progress ucp on ucp.user_id = p.id
left join public.camos c on c.id = ucp.camo_id
left join public.camo_groups cg on cg.id = c.camo_group_id
group by p.id,p.username,p.platform;

create or replace function public.get_user_rank(p_user_id uuid)
returns table(rank_position bigint, completed_count int, completion_pct int) language sql stable as $$
with ranked as (
  select user_id, completed_count, completion_pct,
  rank() over(order by completed_count desc, completion_pct desc, mastery_count desc, last_updated desc nulls last) as r
  from public.leaderboard_public
)
select r as rank_position, ranked.completed_count, ranked.completion_pct
from ranked where user_id = p_user_id;
$$;

alter table public.profiles enable row level security;
alter table public.user_camo_progress enable row level security;
alter table public.friends enable row level security;

create policy "profiles are readable" on public.profiles for select using (true);
create policy "insert own profile" on public.profiles for insert with check (auth.uid()=id);
create policy "update own profile" on public.profiles for update using (auth.uid()=id);

create policy "read own progress" on public.user_camo_progress for select using (auth.uid()=user_id);
create policy "write own progress" on public.user_camo_progress for insert with check (auth.uid()=user_id);
create policy "update own progress" on public.user_camo_progress for update using (auth.uid()=user_id);
create policy "delete own progress" on public.user_camo_progress for delete using (auth.uid()=user_id);

create policy "friends select own rows" on public.friends for select using (auth.uid()=user_id or auth.uid()=friend_user_id);
create policy "friends mutate own rows" on public.friends for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

grant select on public.weapon_categories, public.weapons, public.camo_groups, public.camos, public.camo_requirements, public.leaderboard_public, public.weapon_progress_summary, public.category_progress_summary to anon, authenticated;
grant execute on function public.get_user_rank(uuid) to authenticated;
