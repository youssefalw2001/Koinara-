create extension if not exists "pgcrypto";

-- Daira Circle Teams schema
-- Real product tables for creator Circles, Top 3 rewards, supporter entries, gifts, payments, and moderation.

create table if not exists public.creator_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  username text not null unique,
  bio text,
  city text,
  country text,
  profile_photo_url text,
  cover_photo_url text,
  is_verified boolean not null default false,
  age_confirmed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.circles (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  slug text not null unique,
  title text not null,
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  round_ends_at timestamptz,
  total_entries integer not null default 0,
  total_points integer not null default 0,
  total_gift_amount_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists circles_creator_id_idx on public.circles(creator_id);
create index if not exists circles_slug_idx on public.circles(slug);
create index if not exists circles_status_idx on public.circles(status);

create table if not exists public.circle_rewards (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles(id) on delete cascade,
  rank integer not null check (rank in (1, 2, 3)),
  reward_title text not null,
  reward_description text,
  reward_type text not null default 'in_app_attention' check (reward_type in ('in_app_attention', 'highlighted_message', 'creator_reaction', 'reply_request', 'badge', 'share_card_mention', 'custom_safe')),
  is_approved boolean not null default true,
  created_at timestamptz not null default now(),
  unique(circle_id, rank)
);

create index if not exists circle_rewards_circle_id_idx on public.circle_rewards(circle_id);

create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles(id) on delete cascade,
  supporter_user_id uuid references auth.users(id) on delete set null,
  supporter_handle text not null,
  platform text not null check (platform in ('Snapchat', 'Instagram', 'TikTok', 'WhatsApp', 'Telegram', 'Other')),
  message text,
  points integer not null default 0,
  status text not null default 'active' check (status in ('active', 'hidden', 'blocked', 'reported')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists entries_circle_points_idx on public.entries(circle_id, points desc, created_at asc);
create index if not exists entries_circle_id_idx on public.entries(circle_id);
create index if not exists entries_supporter_handle_idx on public.entries(supporter_handle);

create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles(id) on delete cascade,
  entry_id uuid not null references public.entries(id) on delete cascade,
  gift_type text not null check (gift_type in ('rose', 'golden', 'diamond', 'crown', 'shield', 'custom')),
  points integer not null,
  amount_cents integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'pending_payment' check (status in ('pending_payment', 'paid', 'failed', 'refunded', 'fake_mvp')),
  stripe_checkout_session_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists gifts_circle_id_idx on public.gifts(circle_id);
create index if not exists gifts_entry_id_idx on public.gifts(entry_id);
create index if not exists gifts_status_idx on public.gifts(status);

create table if not exists public.creator_earnings (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  circle_id uuid references public.circles(id) on delete set null,
  gift_id uuid references public.gifts(id) on delete set null,
  gross_amount_cents integer not null,
  creator_amount_cents integer not null,
  platform_amount_cents integer not null,
  status text not null default 'pending' check (status in ('pending', 'available', 'paid_out', 'held', 'reversed')),
  created_at timestamptz not null default now(),
  available_at timestamptz,
  paid_out_at timestamptz
);

create index if not exists creator_earnings_creator_id_idx on public.creator_earnings(creator_id);
create index if not exists creator_earnings_status_idx on public.creator_earnings(status);

create table if not exists public.reward_claims (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references public.circles(id) on delete cascade,
  entry_id uuid not null references public.entries(id) on delete cascade,
  reward_id uuid not null references public.circle_rewards(id) on delete cascade,
  rank_awarded integer not null check (rank_awarded in (1, 2, 3)),
  status text not null default 'pending_creator_action' check (status in ('pending_creator_action', 'fulfilled', 'declined', 'expired')),
  created_at timestamptz not null default now(),
  fulfilled_at timestamptz
);

create index if not exists reward_claims_circle_id_idx on public.reward_claims(circle_id);
create index if not exists reward_claims_entry_id_idx on public.reward_claims(entry_id);

create table if not exists public.moderation_reports (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid references public.circles(id) on delete cascade,
  entry_id uuid references public.entries(id) on delete cascade,
  reporter_user_id uuid references auth.users(id) on delete set null,
  reason text not null,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists moderation_reports_status_idx on public.moderation_reports(status);

-- Public read for active creator pages and Circle leaderboards.
alter table public.creator_profiles enable row level security;
alter table public.circles enable row level security;
alter table public.circle_rewards enable row level security;
alter table public.entries enable row level security;
alter table public.gifts enable row level security;
alter table public.creator_earnings enable row level security;
alter table public.reward_claims enable row level security;
alter table public.moderation_reports enable row level security;

create policy "Public can read creator profiles" on public.creator_profiles for select using (true);
create policy "Public can read active circles" on public.circles for select using (status = 'active');
create policy "Public can read circle rewards" on public.circle_rewards for select using (true);
create policy "Public can read active entries" on public.entries for select using (status = 'active');

-- MVP insert policies. Tighten later with auth, captcha, rate-limits, and Edge Functions.
create policy "Anyone can create creator profile during MVP" on public.creator_profiles for insert with check (true);
create policy "Anyone can create circle during MVP" on public.circles for insert with check (true);
create policy "Anyone can create circle rewards during MVP" on public.circle_rewards for insert with check (true);
create policy "Anyone can enter circle during MVP" on public.entries for insert with check (true);
create policy "Anyone can create pending gifts during MVP" on public.gifts for insert with check (true);

create policy "Creators can read own earnings" on public.creator_earnings for select using (
  exists (
    select 1 from public.creator_profiles cp
    where cp.id = creator_earnings.creator_id
    and cp.user_id = auth.uid()
  )
);

create policy "Authenticated users can create reports" on public.moderation_reports for insert with check (auth.uid() is not null or reporter_user_id is null);

create or replace function public.recalculate_circle_totals(p_circle_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.circles
  set total_entries = (select count(*) from public.entries where circle_id = p_circle_id and status = 'active'),
      total_points = coalesce((select sum(points) from public.entries where circle_id = p_circle_id and status = 'active'), 0),
      total_gift_amount_cents = coalesce((select sum(amount_cents) from public.gifts where circle_id = p_circle_id and status in ('paid', 'pending_payment', 'fake_mvp')), 0),
      updated_at = now()
  where id = p_circle_id;
end;
$$;

create or replace function public.after_entry_or_gift_update()
returns trigger
language plpgsql
security definer
as $$
declare
  v_circle_id uuid;
begin
  v_circle_id := coalesce(new.circle_id, old.circle_id);
  perform public.recalculate_circle_totals(v_circle_id);
  return coalesce(new, old);
end;
$$;

drop trigger if exists entries_recalculate_circle_totals on public.entries;
create trigger entries_recalculate_circle_totals
after insert or update or delete on public.entries
for each row execute function public.after_entry_or_gift_update();

drop trigger if exists gifts_recalculate_circle_totals on public.gifts;
create trigger gifts_recalculate_circle_totals
after insert or update or delete on public.gifts
for each row execute function public.after_entry_or_gift_update();
