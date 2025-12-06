-- Create certificates table for blockchain verification
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  issuer text not null,
  issue_date date not null,
  file_url text,
  blockchain_hash text unique not null,
  verified boolean default false,
  created_at timestamptz default now()
);

alter table public.certificates enable row level security;

-- RLS Policies for certificates
create policy "certificates_select_own"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "certificates_select_by_hash"
  on public.certificates for select
  using (true); -- Anyone can verify a certificate by hash

create policy "certificates_insert_own"
  on public.certificates for insert
  with check (auth.uid() = user_id);

create policy "certificates_delete_own"
  on public.certificates for delete
  using (auth.uid() = user_id);
