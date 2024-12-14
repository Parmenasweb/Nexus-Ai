-- -- Create profiles table
-- create table profiles (
--   id uuid references auth.users on delete cascade not null primary key,
--   email text not null unique,
--   full_name text,
--   avatar_url text,
--   credits integer not null default 50,
--   subscription_tier text not null default 'free',
--   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
--   updated_at timestamp with time zone default timezone('utc'::text, now()) not null
-- );

-- -- Create history table
-- create table history (
--   id uuid default uuid_generate_v4() primary key,
--   user_id uuid references profiles(id) on delete cascade not null,
--   tool_type text not null,
--   action text not null,
--   prompt text,
--   result text,
--   credits_used integer not null,
--   metadata jsonb,
--   created_at timestamp with time zone default timezone('utc'::text, now()) not null
-- );

-- -- Set up Row Level Security (RLS)
-- alter table profiles enable row level security;
-- alter table history enable row level security;

-- -- Create policies
-- create policy "Users can view own profile"
--   on profiles for select
--   using ( auth.uid() = id );

-- create policy "Users can update own profile"
--   on profiles for update
--   using ( auth.uid() = id );

-- create policy "Users can view own history"
--   on history for select
--   using ( auth.uid() = user_id );

-- create policy "Users can insert own history"
--   on history for insert
--   with check ( auth.uid() = user_id );

-- -- Create function to handle new user creation
-- create function public.handle_new_user()
-- returns trigger as $$
-- begin
--   insert into public.profiles (id, email, full_name, credits, subscription_tier)
--   values (new.id, new.email, new.raw_user_meta_data->>'full_name', 50, 'free');
--   return new;
-- end;
-- $$ language plpgsql security definer;

-- -- Create trigger for new user creation
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user();

-- -- Create function to update profile timestamps
-- create function public.handle_updated_at()
-- returns trigger as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$ language plpgsql security definer;

-- -- Create trigger for updating timestamps
-- create trigger profiles_updated_at
--   before update on profiles
--   for each row execute procedure public.handle_updated_at();