import { supabase } from './supabase';

type CreateRadarLinkInput = {
  title: string;
  slug: string;
};

const fallbackUserId = '00000000-0000-0000-0000-000000000001';

export function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export async function createRadarLink(input: CreateRadarLinkInput) {
  const slug = normalizeSlug(input.slug) || `radar-${Math.random().toString(36).slice(2, 8)}`;

  if (!supabase) {
    return {
      id: crypto.randomUUID(),
      user_id: fallbackUserId,
      title: input.title || 'Social Vibe Check',
      slug,
      is_active: true,
    };
  }

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id || fallbackUserId;

  const { data, error } = await supabase
    .from('viral_links')
    .insert({
      user_id: userId,
      title: input.title || 'Social Vibe Check',
      slug,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
