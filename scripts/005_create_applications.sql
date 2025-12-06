-- Create job applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  cv_id uuid references public.cvs(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(job_id, user_id) -- One application per job per user
);

alter table public.applications enable row level security;

-- RLS Policies for applications
create policy "applications_select_own"
  on public.applications for select
  using (auth.uid() = user_id or auth.uid() in (
    select owner_id from public.companies 
    where id in (select company_id from public.jobs where id = job_id)
  ));

create policy "applications_insert_own"
  on public.applications for insert
  with check (auth.uid() = user_id);

create policy "applications_update_by_applicant"
  on public.applications for update
  using (auth.uid() = user_id);

create policy "applications_update_by_employer"
  on public.applications for update
  using (auth.uid() in (
    select owner_id from public.companies 
    where id in (select company_id from public.jobs where id = job_id)
  ));
