-- Daily Queen Battle + King Leaderboard extension for Daira

create table if not exists public.daily_battles (
  id uuid primary key default gen_random_uuid(),
  battle_date date not null,
  region text not null default 'GCC',
  city text,
  status text not null default 'active' check (status in ('scheduled', 'active', 'ended', 'cancelled')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null default (now() + interval '24 hours'),
  created_at timestamptz not null default now(),
  unique(battle_date, region, city)
);

create index if not exists daily_battles_status_idx on public.daily_battles(status);
create index if not exists daily_battles_region_city_idx on public.daily_battles(region, city);

create table if not exists public.queen_scores (
  id uuid primary key default gen_random_uuid(),
  battle_id uuid not null references public.daily_battles(id) on delete cascade,
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  circle_id uuid references public.circles(id) on delete set null,
  total_points integer not null default 0,
  total_paid_amount_cents integer not null default 0,
  rank integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(battle_id, creator_id)
);

create index if not exists queen_scores_battle_points_idx on public.queen_scores(battle_id, total_points desc);
create index if not exists queen_scores_creator_idx on public.queen_scores(creator_id);

create table if not exists public.king_scores (
  id uuid primary key default gen_random_uuid(),
  battle_id uuid not null references public.daily_battles(id) on delete cascade,
  supporter_handle text not null,
  supporter_user_id uuid references auth.users(id) on delete set null,
  favorite_creator_id uuid references public.creator_profiles(id) on delete set null,
  total_points integer not null default 0,
  total_paid_amount_cents integer not null default 0,
  title text not null default 'Royal Supporter' check (title in ('Crown King', 'Diamond Prince', 'Golden Guard', 'Royal Supporter', 'Mystery King')),
  rank integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(battle_id, supporter_handle)
);

create index if not exists king_scores_battle_points_idx on public.king_scores(battle_id, total_points desc);
create index if not exists king_scores_handle_idx on public.king_scores(supporter_handle);

create table if not exists public.royal_invites (
  id uuid primary key default gen_random_uuid(),
  battle_id uuid references public.daily_battles(id) on delete cascade,
  creator_id uuid not null references public.creator_profiles(id) on delete cascade,
  supporter_handle text not null,
  king_score_id uuid references public.king_scores(id) on delete set null,
  message text,
  status text not null default 'sent' check (status in ('sent', 'accepted', 'declined', 'expired', 'cancelled')),
  created_at timestamptz not null default now(),
  responded_at timestamptz
);

create index if not exists royal_invites_creator_idx on public.royal_invites(creator_id);
create index if not exists royal_invites_supporter_idx on public.royal_invites(supporter_handle);
create index if not exists royal_invites_status_idx on public.royal_invites(status);

alter table public.daily_battles enable row level security;
alter table public.queen_scores enable row level security;
alter table public.king_scores enable row level security;
alter table public.royal_invites enable row level security;

create policy "Public can read active daily battles" on public.daily_battles for select using (true);
create policy "Public can read queen scores" on public.queen_scores for select using (true);
create policy "Public can read king scores" on public.king_scores for select using (true);
create policy "Public can read royal invites" on public.royal_invites for select using (true);

-- MVP insert policy for Royal Invites. Tighten later with creator auth.
create policy "Anyone can create royal invites during MVP" on public.royal_invites for insert with check (true);

create or replace function public.upsert_daily_scores_for_paid_gift(
  p_battle_id uuid,
  p_circle_id uuid,
  p_entry_id uuid,
  p_gift_id uuid
)
returns void
language plpgsql
security definer
as $$
declare
  v_creator_id uuid;
  v_supporter_handle text;
  v_points integer;
  v_amount integer;
begin
  select c.creator_id into v_creator_id
  from public.circles c
  where c.id = p_circle_id;

  select e.supporter_handle into v_supporter_handle
  from public.entries e
  where e.id = p_entry_id;

  select g.points, g.amount_cents into v_points, v_amount
  from public.gifts g
  where g.id = p_gift_id
  and g.status = 'paid';

  if v_creator_id is null or v_supporter_handle is null or v_points is null then
    return;
  end if;

  insert into public.queen_scores (battle_id, creator_id, circle_id, total_points, total_paid_amount_cents)
  values (p_battle_id, v_creator_id, p_circle_id, v_points, coalesce(v_amount, 0))
  on conflict (battle_id, creator_id)
  do update set
    total_points = public.queen_scores.total_points + excluded.total_points,
    total_paid_amount_cents = public.queen_scores.total_paid_amount_cents + excluded.total_paid_amount_cents,
    updated_at = now();

  insert into public.king_scores (battle_id, supporter_handle, favorite_creator_id, total_points, total_paid_amount_cents)
  values (p_battle_id, v_supporter_handle, v_creator_id, v_points, coalesce(v_amount, 0))
  on conflict (battle_id, supporter_handle)
  do update set
    total_points = public.king_scores.total_points + excluded.total_points,
    total_paid_amount_cents = public.king_scores.total_paid_amount_cents + excluded.total_paid_amount_cents,
    favorite_creator_id = excluded.favorite_creator_id,
    updated_at = now();
end;
$$;

create or replace function public.assign_king_titles(p_battle_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  with ranked as (
    select id, row_number() over (order by total_points desc, updated_at asc) as rn
    from public.king_scores
    where battle_id = p_battle_id
  )
  update public.king_scores ks
  set rank = ranked.rn,
      title = case
        when ranked.rn = 1 then 'Crown King'
        when ranked.rn = 2 then 'Diamond Prince'
        when ranked.rn = 3 then 'Golden Guard'
        else 'Royal Supporter'
      end,
      updated_at = now()
  from ranked
  where ks.id = ranked.id;

  with ranked as (
    select id, row_number() over (order by total_points desc, updated_at asc) as rn
    from public.queen_scores
    where battle_id = p_battle_id
  )
  update public.queen_scores qs
  set rank = ranked.rn,
      updated_at = now()
  from ranked
  where qs.id = ranked.id;
end;
$$;
