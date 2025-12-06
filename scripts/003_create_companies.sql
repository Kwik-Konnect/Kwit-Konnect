-- Create companies table
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  logo_url text,
  industry text,
  size text,
  location text,
  website text,
  description text,
  culture text,
  perks text[],
  rating numeric(2,1) default 0,
  review_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.companies enable row level security;

-- RLS Policies for companies
create policy "companies_select_all"
  on public.companies for select
  using (true); -- Everyone can view companies

create policy "companies_insert_own"
  on public.companies for insert
  with check (auth.uid() = owner_id);

create policy "companies_update_own"
  on public.companies for update
  using (auth.uid() = owner_id);

create policy "companies_delete_own"
  on public.companies for delete
  using (auth.uid() = owner_id);
