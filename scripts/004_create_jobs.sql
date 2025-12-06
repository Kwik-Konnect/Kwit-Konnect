-- Create jobs table
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  department text,
  location text,
  type text, -- full-time, part-time, contract
  salary_min integer,
  salary_max integer,
  description text,
  requirements text[],
  responsibilities text[],
  benefits text[],
  status text default 'active' check (status in ('active', 'closed', 'draft')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.jobs enable row level security;

-- RLS Policies for jobs
create policy "jobs_select_all"
  on public.jobs for select
  using (status = 'active' or auth.uid() in (select owner_id from public.companies where id = company_id));

create policy "jobs_insert_company_owner"
  on public.jobs for insert
  with check (auth.uid() in (select owner_id from public.companies where id = company_id));

create policy "jobs_update_company_owner"
  on public.jobs for update
  using (auth.uid() in (select owner_id from public.companies where id = company_id));

create policy "jobs_delete_company_owner"
  on public.jobs for delete
  using (auth.uid() in (select owner_id from public.companies where id = company_id));
