import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type SolvePayload = {
  interactionId: string;
  paymentId?: string;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function normalizeHandle(handle: string | null) {
  return (handle || '').trim().replace(/^@/, '').toLowerCase();
}

function scoreMatch(args: { handleMatch: boolean; samePlatform: boolean; timezoneSignal: boolean; repeatSignal: boolean }) {
  let score = 0;
  if (args.handleMatch) score += 65;
  if (args.samePlatform) score += 10;
  if (args.timezoneSignal) score += 10;
  if (args.repeatSignal) score += 15;
  return Math.min(score, 100);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
      global: { headers: authHeader ? { Authorization: authHeader } : {} },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }

    const body = (await req.json()) as SolvePayload;

    const { data: interaction, error: interactionError } = await supabase
      .from('interactions')
      .select('id, poster_user_id, submitted_handle, submitted_platform, consent_to_identity_match, device_metadata, click_count, behavioral_score, risk_label')
      .eq('id', body.interactionId)
      .single();

    if (interactionError || !interaction) {
      return Response.json({ error: 'Interaction not found' }, { status: 404, headers: corsHeaders });
    }

    if (interaction.poster_user_id !== user.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders });
    }

    if (!interaction.consent_to_identity_match) {
      const result = {
        resultLevel: 'blocked_no_consent',
        confidence: 0,
        hint: 'Identity matching is blocked because the visitor did not consent.',
      };

      await supabase.from('identity_match_attempts').insert({
        user_id: user.id,
        interaction_id: interaction.id,
        payment_id: body.paymentId || null,
        result_level: 'blocked_no_consent',
        confidence: 0,
        result_json: result,
      });

      return Response.json(result, { headers: corsHeaders });
    }

    if (body.paymentId) {
      const { data: payment } = await supabase
        .from('payments')
        .select('id, status, product_key')
        .eq('id', body.paymentId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (!payment || payment.status !== 'paid') {
        return Response.json({ error: 'Paid unlock required.' }, { status: 402, headers: corsHeaders });
      }
    }

    const submittedHandle = normalizeHandle(interaction.submitted_handle);
    const { data: contacts, error: contactsError } = await supabase
      .from('contact_records')
      .select('id, normalized_handle, platform, phone_suffix_2')
      .eq('user_id', user.id)
      .eq('normalized_handle', submittedHandle)
      .limit(5);

    if (contactsError) throw contactsError;

    const deviceMetadata = interaction.device_metadata || {};
    const timezone = String(deviceMetadata.timezone || '');
    const timezoneSignal = timezone.includes('Riyadh') || timezone.includes('Dubai') || timezone.includes('Kuwait');
    const repeatSignal = Number(interaction.click_count || 0) >= 2;
    const best = contacts?.[0];

    if (!best) {
      const confidence = scoreMatch({ handleMatch: false, samePlatform: false, timezoneSignal, repeatSignal });
      const result = {
        resultLevel: 'soft',
        confidence,
        hint: 'No contact suffix match found. Behavioral profile only.',
        behavioralLabel: interaction.risk_label,
      };

      await supabase.from('identity_match_attempts').insert({
        user_id: user.id,
        interaction_id: interaction.id,
        payment_id: body.paymentId || null,
        result_level: 'soft',
        confidence,
        result_json: result,
      });

      return Response.json(result, { headers: corsHeaders });
    }

    const confidence = scoreMatch({
      handleMatch: true,
      samePlatform: best.platform === interaction.submitted_platform,
      timezoneSignal,
      repeatSignal,
    });

    const result = {
      resultLevel: confidence >= 80 ? 'medium' : 'soft',
      confidence,
      hint: best.phone_suffix_2 ? `Possible known contact. Phone suffix may end in -${best.phone_suffix_2}.` : 'Possible known contact. No suffix available.',
      behavioralLabel: interaction.risk_label,
      matchedSignals: {
        handle: true,
        platform: best.platform === interaction.submitted_platform,
        timezone: timezoneSignal,
        repeatVisit: repeatSignal,
      },
    };

    await supabase.from('identity_match_attempts').insert({
      user_id: user.id,
      interaction_id: interaction.id,
      payment_id: body.paymentId || null,
      result_level: result.resultLevel,
      confidence,
      result_json: result,
    });

    return Response.json(result, { headers: corsHeaders });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500, headers: corsHeaders });
  }
});
