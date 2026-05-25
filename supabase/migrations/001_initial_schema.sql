create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  country_code text check (country_code in ('SA', 'AE', 'KW')),
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'plus', 'premium')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.viral_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  slug text not null unique,
  title text not null default 'Social Vibe Check',
  theme text not null default 'gold_dark',
  is_active boolean not null default true,
  total_clicks integer not null default 0,
  total_submissions integer not null default 0,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create index if not exists viral_links_user_id_idx on public.viral_links(user_id);
create index if not exists viral_links_slug_idx on public.viral_links(slug);

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  viral_link_id uuid not null references public.viral_links(id) on delete cascade,
  poster_user_id uuid not null references public.users(id) on delete cascade,
  submitted_handle text,
  submitted_platform text check (submitted_platform in ('instagram', 'snapchat', 'whatsapp', 'tiktok', 'x', 'telegram', 'other')),
  vibe_answer text,
  vibe_score integer check (vibe_score >= 0 and vibe_score <= 100),
  consent_to_share boolean not null default false,
  consent_to_identity_match boolean not null default false,
  metadata_capture_consent boolean not null default false,
  device_metadata jsonb not null default '{}'::jsonb,
  behavioral_score numeric(5,2) not null default 0,
  risk_label text not null default 'unknown' check (risk_label in ('unknown', 'low_signal', 'curious', 'high_interest', 'repeat_observer')),
  click_count integer not null default 1,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  user_agent text,
  referrer text,
  ip_hash text,
  ip_country_code text,
  ip_region text,
  created_at timestamptz not null default now()
);

create index if not exists interactions_viral_link_id_idx on public.interactions(viral_link_id);
create index if not exists interactions_poster_user_id_idx on public.interactions(poster_user_id);
create index if not exists interactions_submitted_handle_idx on public.interactions(submitted_handle);
create index if not exists interactions_device_metadata_gin_idx on public.interactions using gin (device_metadata);
create index if not exists interactions_behavioral_score_idx on public.interactions(behavioral_score desc);

create table if not exists public.interaction_events (
  id uuid primary key default gen_random_uuid(),
  interaction_id uuid references public.interactions(id) on delete cascade,
  viral_link_id uuid not null references public.viral_links(id) on delete cascade,
  poster_user_id uuid not null references public.users(id) on delete cascade,
  event_type text not null check (event_type in ('link_open', 'vibe_started', 'handle_submitted', 'report_teaser_viewed', 'payment_clicked', 'return_visit')),
  occurred_at timestamptz not null default now(),
  event_metadata jsonb not null default '{}'::jsonb
);

create index if not exists interaction_events_interaction_id_idx on public.interaction_events(interaction_id);
create index if not exists interaction_events_viral_link_id_idx on public.interaction_events(viral_link_id);
create index if not exists interaction_events_time_idx on public.interaction_events(occurred_at desc);

create table if not exists public.contact_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  source text not null default 'manual' check (source in ('manual', 'csv', 'phonebook')),
  consent_confirmed boolean not null default false,
  total_contacts integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  contact_import_id uuid references public.contact_imports(id) on delete cascade,
  display_name_hash text,
  phone_hash text,
  email_hash text,
  phone_suffix_2 text check (phone_suffix_2 ~ '^[0-9]{2}$'),
  normalized_handle text,
  platform text check (platform in ('instagram', 'snapchat', 'whatsapp', 'tiktok', 'x', 'telegram', 'other')),
  consent_basis text not null default 'user_imported' check (consent_basis in ('user_imported', 'mutual_consent', 'manual_confirmed')),
  created_at timestamptz not null default now()
);

create index if not exists contact_records_user_id_idx on public.contact_records(user_id);
create index if not exists contact_records_handle_idx on public.contact_records(user_id, normalized_handle);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  product_key text not null check (product_key in ('quick_signal', 'full_radar_report', 'radar_boost', 'premium_monthly')),
  amount_cents integer not null,
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.report_unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  payment_id uuid references public.payments(id) on delete set null,
  unlock_type text not null check (unlock_type in ('quick_signal', 'full_radar_report', 'radar_boost')),
  viral_link_id uuid references public.viral_links(id) on delete cascade,
  interaction_id uuid references public.interactions(id) on delete cascade,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.identity_match_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  interaction_id uuid not null references public.interactions(id) on delete cascade,
  payment_id uuid references public.payments(id) on delete set null,
  result_level text not null check (result_level in ('blocked_no_consent', 'soft', 'medium', 'full')),
  confidence numeric(5,2) not null default 0,
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.viral_links enable row level security;
alter table public.interactions enable row level security;
alter table public.interaction_events enable row level security;
alter table public.contact_imports enable row level security;
alter table public.contact_records enable row level security;
alter table public.payments enable row level security;
alter table public.report_unlocks enable row level security;
alter table public.identity_match_attempts enable row level security;

create policy "Users can read own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Users can manage own viral links" on public.viral_links for all using (auth.uid() = user_id);
create policy "Users can read interactions on their links" on public.interactions for select using (auth.uid() = poster_user_id);
create policy "Users can read own payments" on public.payments for select using (auth.uid() = user_id);
create policy "Users can read own report unlocks" on public.report_unlocks for select using (auth.uid() = user_id);

create or replace function public.increment_viral_link_submission(p_link_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.viral_links
  set total_submissions = total_submissions + 1,
      total_clicks = total_clicks + 1
  where id = p_link_id;
end;
$$;

create or replace function public.calculate_behavioral_score(
  p_click_count int,
  p_minutes_since_post numeric,
  p_return_visits int,
  p_submitted_handle boolean,
  p_payment_intent boolean
)
returns numeric
language plpgsql
as $$
declare
  score numeric := 0;
begin
  score := score + least(p_click_count * 8, 30);

  if p_minutes_since_post <= 2 then
    score := score + 30;
  elsif p_minutes_since_post <= 10 then
    score := score + 20;
  elsif p_minutes_since_post <= 60 then
    score := score + 10;
  end if;

  score := score + least(p_return_visits * 10, 25);

  if p_submitted_handle then score := score + 10; end if;
  if p_payment_intent then score := score + 5; end if;

  return least(score, 100);
end;
$$;
