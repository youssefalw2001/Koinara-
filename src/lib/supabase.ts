import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export type CreatorProfile = {
  id: string;
  display_name: string;
  username: string;
  bio: string | null;
  city: string | null;
  country: string | null;
  profile_photo_url: string | null;
  cover_photo_url: string | null;
  created_at: string;
};

export type Circle = {
  id: string;
  creator_id: string;
  slug: string;
  title: string;
  status: 'active' | 'paused' | 'ended';
  round_ends_at: string | null;
  created_at: string;
};

export type CircleReward = {
  id: string;
  circle_id: string;
  rank: number;
  reward_title: string;
  reward_description: string | null;
  created_at: string;
};

export type CircleEntry = {
  id: string;
  circle_id: string;
  supporter_handle: string;
  platform: string;
  message: string | null;
  points: number;
  created_at: string;
};

export type GiftType = {
  id: string;
  label: string;
  points: number;
  amountCents: number;
  description: string;
  stripeEnvKey: string;
};

export const giftTypes: GiftType[] = [
  { id: 'rose', label: 'Rose Entry', points: 50, amountCents: 99, stripeEnvKey: 'VITE_STRIPE_LINK_ROSE_ENTRY', description: 'A paid soft signal to enter her Circle.' },
  { id: 'golden', label: 'Golden Entry', points: 150, amountCents: 199, stripeEnvKey: 'VITE_STRIPE_LINK_GOLDEN_ENTRY', description: 'A paid entry that stands out in the Golden Inbox.' },
  { id: 'diamond', label: 'Diamond Entry', points: 700, amountCents: 499, stripeEnvKey: 'VITE_STRIPE_LINK_DIAMOND_ENTRY', description: 'A paid push toward Top 3.' },
  { id: 'crown', label: 'Crown Entry', points: 1600, amountCents: 999, stripeEnvKey: 'VITE_STRIPE_LINK_CROWN_ENTRY', description: 'A paid challenge for Crown Holder status.' },
];

export function getGiftCheckoutLink(giftId: string) {
  const gift = giftTypes.find((item) => item.id === giftId);
  if (!gift) return '';
  return (import.meta.env[gift.stripeEnvKey] as string | undefined) || '';
}

export function hasGiftCheckoutLink(giftId: string) {
  return Boolean(getGiftCheckoutLink(giftId));
}
