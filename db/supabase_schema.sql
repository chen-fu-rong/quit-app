-- Supabase schema for Quit (e-cigarette) tracker
-- Run this SQL in your Supabase SQL editor to create tables, RLS policies, and seed data.

-- Required extension for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Table: quit_attempts
create table if not exists quit_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  start_date timestamptz not null,
  end_date timestamptz,
  status text not null default 'active', -- active | relapsed | completed
  attempt_number int default 1,
  notes text,
  created_at timestamptz default now()
);

-- Table: cravings
create table if not exists cravings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid references quit_attempts(id) on delete set null,
  occurred_at timestamptz default now(),
  intensity int check (intensity >= 1 and intensity <= 10) not null default 5,
  handled boolean default false,
  notes text
);

create index if not exists idx_cravings_occurred_at on cravings(occurred_at desc);

-- Table: daily_tips (readable by all users)
create table if not exists daily_tips (
  id uuid primary key default gen_random_uuid(),
  tip_text text not null,
  category text,
  created_at timestamptz default now()
);

-- Row Level Security: only allow users to access their own data
alter table quit_attempts enable row level security;

create policy "users_can_select_quit_attempts" on quit_attempts
  for select using (auth.uid() = user_id);

create policy "users_can_insert_quit_attempts" on quit_attempts
  for insert with check (auth.uid() = user_id);

create policy "users_can_update_quit_attempts" on quit_attempts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users_can_delete_quit_attempts" on quit_attempts
  for delete using (auth.uid() = user_id);


alter table cravings enable row level security;

create policy "users_can_select_cravings" on cravings
  for select using (auth.uid() = user_id);

create policy "users_can_insert_cravings" on cravings
  for insert with check (auth.uid() = user_id);

create policy "users_can_update_cravings" on cravings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users_can_delete_cravings" on cravings
  for delete using (auth.uid() = user_id);

-- daily_tips: allow authenticated users to read; admin can insert
alter table daily_tips enable row level security;
create policy "public_select_daily_tips" on daily_tips
  for select
  using (true);

create policy "authenticated_insert_daily_tips" on daily_tips
  for insert
  with check (auth.role() = 'authenticated');

-- Optional views: user stats (days since start, total cravings)
create or replace view user_quit_stats as
select
  qa.user_id,
  qa.id as attempt_id,
  qa.start_date,
  qa.end_date,
  qa.status,
  qa.attempt_number,
  qa.created_at,
  (current_date - qa.start_date::date) as days_since_start,
  coalesce((select count(*) from cravings c where c.attempt_id = qa.id), 0) as total_cravings
from quit_attempts qa;

-- Seed: sample tips (run once)
insert into daily_tips (tip_text, category) values
('Take 5 deep breaths when a craving hits — it usually passes in minutes.', 'motivation'),
('Drink a glass of water and go for a 5-minute walk to distract yourself.', 'strategy'),
('Remind yourself why you quit — write it down and keep it where you can see it.', 'motivation')
on conflict do nothing;
