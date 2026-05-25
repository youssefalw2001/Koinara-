import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type Payload = {
  slug: string;
  submittedHandle: string;
  submittedPlatform: string;
  metadataCaptureConsent: boolean;
  consentToIdentityMatch: boolean;
  deviceMetadata: Record<string, unknown>;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function normalizeHandle(handle: string) {
  return handle.trim().replace(/^@/, '').toLowerCase();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;

    if (!body.metadataCaptureConsent) {
      return Response.json({ error: 'Metadata capture requires explicit consent.' }, { status: 400, headers: corsHeaders });
    }

    if (!body.slug || !body.submittedHandle) {
      return Response.json({ error: 'Missing required fields.' }, { status: 400, headers: corsHeaders });
    }

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    const { data: link, error: linkError } = await supabase
      .from('viral_links')
      .select('id, user_id')
      .eq('slug', body.slug)
      .eq('is_active', true)
      .single();

    if (linkError || !link) {
      return Response.json({ error: 'Radar link not found.' }, { status: 404, headers: corsHeaders });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('cf-connecting-ip') || 'unknown';
    const salt = Deno.env.get('IP_HASH_SALT') || 'dev-only-salt';
    const ipHash = ip === 'unknown' ? null : await sha256(`${salt}:${ip}`);
    const country = req.headers.get('cf-ipcountry') || req.headers.get('x-vercel-ip-country') || null;
    const region = req.headers.get('x-vercel-ip-country-region') || req.headers.get('cf-region') || null;

    const { data: interaction, error } = await supabase
      .from('interactions')
      .insert({
        viral_link_id: link.id,
        poster_user_id: link.user_id,
        submitted_handle: normalizeHandle(body.submittedHandle),
        submitted_platform: body.submittedPlatform,
        consent_to_share: true,
        consent_to_identity_match: body.consentToIdentityMatch,
        metadata_capture_consent: true,
        device_metadata: body.deviceMetadata,
        ip_hash: ipHash,
        ip_country_code: country,
        ip_region: region,
        behavioral_score: 10,
        risk_label: 'curious',
      })
      .select('id')
      .single();

    if (error) throw error;

    await supabase.from('interaction_events').insert({
      interaction_id: interaction.id,
      viral_link_id: link.id,
      poster_user_id: link.user_id,
      event_type: 'handle_submitted',
      event_metadata: {
        platform: body.submittedPlatform,
        consentToIdentityMatch: body.consentToIdentityMatch,
      },
    });

    await supabase.rpc('increment_viral_link_submission', { p_link_id: link.id });

    return Response.json({ ok: true, interactionId: interaction.id }, { headers: corsHeaders });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500, headers: corsHeaders });
  }
});
