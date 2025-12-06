-- Create community posts table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('text', 'achievement', 'question', 'poll')),
  content text not null,
  media_url text,
  poll_options jsonb, -- For poll type posts
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

-- RLS Policies for posts
create policy "posts_select_all"
  on public.posts for select
  using (true);

create policy "posts_insert_own"
  on public.posts for insert
  with check (auth.uid() = author_id);

create policy "posts_update_own"
  on public.posts for update
  using (auth.uid() = author_id);

create policy "posts_delete_own"
  on public.posts for delete
  using (auth.uid() = author_id);

-- Create post reactions table
create table if not exists public.post_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  reaction text not null,
  created_at timestamptz default now(),
  unique(post_id, user_id, reaction)
);

alter table public.post_reactions enable row level security;

-- RLS Policies for reactions
create policy "reactions_select_all"
  on public.post_reactions for select
  using (true);

create policy "reactions_insert_own"
  on public.post_reactions for insert
  with check (auth.uid() = user_id);

create policy "reactions_delete_own"
  on public.post_reactions for delete
  using (auth.uid() = user_id);

-- Create comments table
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

-- RLS Policies for comments
create policy "comments_select_all"
  on public.comments for select
  using (true);

create policy "comments_insert_own"
  on public.comments for insert
  with check (auth.uid() = author_id);

create policy "comments_delete_own"
  on public.comments for delete
  using (auth.uid() = author_id);
