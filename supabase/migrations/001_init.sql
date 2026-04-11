create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  platform text not null check (platform in ('PC','PlayStation','Xbox')),
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.user_camo_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  camo_id text not null,
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

alter table public.profiles enable row level security;
alter table public.user_camo_progress enable row level security;
alter table public.friends enable row level security;

create policy "profiles are readable" on public.profiles for select using (true);
create policy "insert own profile" on public.profiles for insert with check (auth.uid()=id);
create policy "update own profile" on public.profiles for update using (auth.uid()=id);

create policy "progress is readable" on public.user_camo_progress for select using (true);
create policy "write own progress" on public.user_camo_progress for insert with check (auth.uid()=user_id);
create policy "update own progress" on public.user_camo_progress for update using (auth.uid()=user_id);
create policy "delete own progress" on public.user_camo_progress for delete using (auth.uid()=user_id);

create policy "friends select own rows" on public.friends for select using (auth.uid()=user_id or auth.uid()=friend_user_id);
create policy "friends mutate own rows" on public.friends for all using (auth.uid()=user_id) with check (auth.uid()=user_id);

grant select on public.profiles, public.user_camo_progress, public.friends to anon, authenticated;
