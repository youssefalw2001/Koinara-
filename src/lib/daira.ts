import { getGiftCheckoutLink, giftTypes, supabase } from './supabase';

export type CreateCircleInput = {
  creatorName: string;
  username: string;
  title: string;
  slug: string;
  city?: string;
  country?: string;
  reward1: string;
  reward2: string;
  reward3: string;
};

export type JoinCircleInput = {
  circleId: string;
  handle: string;
  platform: string;
  message?: string;
  giftId: string;
};

export type LeaderboardEntry = {
  id: string;
  supporter_handle: string;
  platform: string;
  message: string | null;
  points: number;
  created_at: string;
};

const fallbackCreatorId = '00000000-0000-0000-0000-000000000001';
const fallbackCircleId = '00000000-0000-0000-0000-000000000101';

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export async function createCircle(input: CreateCircleInput) {
  const slug = normalizeSlug(input.slug) || normalizeSlug(input.creatorName) || `circle-${Date.now()}`;

  if (!supabase) {
    return {
      circle: {
        id: fallbackCircleId,
        creator_id: fallbackCreatorId,
        slug,
        title: input.title || `${input.creatorName}'s Circle`,
        status: 'active',
        round_ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      },
      configured: false,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from('creator_profiles')
    .insert({
      display_name: input.creatorName,
      username: normalizeSlug(input.username || input.creatorName),
      city: input.city || null,
      country: input.country || null,
      bio: 'Create your Circle. Let them prove their spot.',
    })
    .select('*')
    .single();

  if (profileError) throw profileError;

  const { data: circle, error: circleError } = await supabase
    .from('circles')
    .insert({
      creator_id: profile.id,
      slug,
      title: input.title || `${input.creatorName}'s Circle`,
      status: 'active',
      round_ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
    .select('*')
    .single();

  if (circleError) throw circleError;

  const rewards = [input.reward1, input.reward2, input.reward3].map((reward, index) => ({
    circle_id: circle.id,
    rank: index + 1,
    reward_title: reward,
    reward_description: index === 0 ? 'Crown Holder reward' : index === 1 ? 'Diamond Holder reward' : 'Golden Holder reward',
  }));

  const { error: rewardsError } = await supabase.from('circle_rewards').insert(rewards);
  if (rewardsError) throw rewardsError;

  return { circle, configured: true };
}

export async function fetchCircleBySlug(slug: string) {
  const safeSlug = normalizeSlug(slug);

  if (!supabase) {
    return {
      circle: {
        id: fallbackCircleId,
        creator_id: fallbackCreatorId,
        slug: safeSlug || 'noura',
        title: "Noura's Circle",
        status: 'active',
        round_ends_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      },
      creator: {
        id: fallbackCreatorId,
        display_name: 'Noura',
        username: 'noura',
        bio: 'Top 3 get rewards tonight.',
        city: 'Riyadh',
        country: 'Saudi Arabia',
        profile_photo_url: null,
        cover_photo_url: null,
        created_at: new Date().toISOString(),
      },
      rewards: [
        { rank: 1, reward_title: 'Voice thank-you + pinned Crown spot' },
        { rank: 2, reward_title: 'Highlighted message + creator reaction' },
        { rank: 3, reward_title: 'Top 3 badge + Circle Pulse mention' },
      ],
      configured: false,
    };
  }

  const { data: circle, error: circleError } = await supabase
    .from('circles')
    .select('*')
    .eq('slug', safeSlug)
    .eq('status', 'active')
    .single();

  if (circleError) throw circleError;

  const [{ data: creator, error: creatorError }, { data: rewards, error: rewardsError }] = await Promise.all([
    supabase.from('creator_profiles').select('*').eq('id', circle.creator_id).single(),
    supabase.from('circle_rewards').select('*').eq('circle_id', circle.id).order('rank', { ascending: true }),
  ]);

  if (creatorError) throw creatorError;
  if (rewardsError) throw rewardsError;

  return { circle, creator, rewards, configured: true };
}

export async function fetchLeaderboard(circleId: string): Promise<LeaderboardEntry[]> {
  if (!supabase) {
    return [
      { id: '1', supporter_handle: '@faisal_dxb', platform: 'Snapchat', message: 'Crown spot is mine.', points: 2400, created_at: new Date().toISOString() },
      { id: '2', supporter_handle: '@khaled.9', platform: 'Instagram', message: 'Golden entry.', points: 1850, created_at: new Date().toISOString() },
      { id: '3', supporter_handle: '@m7md', platform: 'TikTok', message: 'Top 3 tonight.', points: 1220, created_at: new Date().toISOString() },
      { id: '4', supporter_handle: '@saud', platform: 'Snapchat', message: null, points: 740, created_at: new Date().toISOString() },
    ];
  }

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('circle_id', circleId)
    .eq('status', 'active')
    .gt('points', 0)
    .order('points', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function joinCircle(input: JoinCircleInput) {
  const gift = giftTypes.find((item) => item.id === input.giftId) || giftTypes[0];
  const checkoutUrl = getGiftCheckoutLink(gift.id);
  const handle = input.handle.trim().startsWith('@') ? input.handle.trim() : `@${input.handle.trim()}`;

  if (!checkoutUrl) {
    throw new Error(`Stripe Payment Link missing for ${gift.label}. Add ${gift.stripeEnvKey} to your environment.`);
  }

  if (!supabase) {
    return {
      entry: {
        id: crypto.randomUUID(),
        circle_id: input.circleId,
        supporter_handle: handle,
        platform: input.platform,
        message: input.message || null,
        points: 0,
        created_at: new Date().toISOString(),
      },
      gift,
      checkoutUrl,
      configured: false,
    };
  }

  const { data: entry, error: entryError } = await supabase
    .from('entries')
    .insert({
      circle_id: input.circleId,
      supporter_handle: handle,
      platform: input.platform,
      message: input.message || null,
      points: 0,
    })
    .select('*')
    .single();

  if (entryError) throw entryError;

  const { error: giftError } = await supabase.from('gifts').insert({
    circle_id: input.circleId,
    entry_id: entry.id,
    gift_type: gift.id,
    points: gift.points,
    amount_cents: gift.amountCents,
    status: 'pending_payment',
  });

  if (giftError) throw giftError;
  return { entry, gift, checkoutUrl, configured: true };
}
