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
};

export const giftTypes: GiftType[] = [
  { id: 'rose', label: 'Rose Entry', points: 50, amountCents: 99, description: 'A soft signal to enter her Circle.' },
  { id: 'golden', label: 'Golden Entry', points: 150, amountCents: 199, description: 'Stand out in the Golden Inbox.' },
  { id: 'diamond', label: 'Diamond Entry', points: 700, amountCents: 499, description: 'Push hard toward Top 3.' },
  { id: 'crown', label: 'Crown Entry', points: 1600, amountCents: 999, description: 'Challenge Crown Holder status.' },
];
