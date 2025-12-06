-- Create company reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text not null,
  content text not null,
  pros text,
  cons text,
  created_at timestamptz default now(),
  unique(company_id, author_id) -- One review per company per user
);

alter table public.reviews enable row level security;

-- RLS Policies for reviews
create policy "reviews_select_all"
  on public.reviews for select
  using (true);

create policy "reviews_insert_own"
  on public.reviews for insert
  with check (auth.uid() = author_id);

create policy "reviews_update_own"
  on public.reviews for update
  using (auth.uid() = author_id);

create policy "reviews_delete_own"
  on public.reviews for delete
  using (auth.uid() = author_id);
