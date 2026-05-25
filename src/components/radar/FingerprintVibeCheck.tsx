import { FormEvent, useState } from 'react';
import { Lock, Radar, ShieldCheck } from 'lucide-react';
import { getDeviceMetadata } from '../../lib/deviceMetadata';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type Props = {
  slug: string;
};

export function FingerprintVibeCheck({ slug }: Props) {
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [consent, setConsent] = useState(false);
  const [identityConsent, setIdentityConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!consent || !handle.trim()) return;

    setLoading(true);

    const deviceMetadata = getDeviceMetadata();
    const functionsUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL as string | undefined;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

    if (functionsUrl && anonKey) {
      await fetch(`${functionsUrl}/capture-vibe-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          slug,
          submittedHandle: handle.trim().replace(/^@/, '').toLowerCase(),
          submittedPlatform: platform,
          metadataCaptureConsent: consent,
          consentToIdentityMatch: identityConsent,
          deviceMetadata,
        }),
      });
    } else {
      console.info('Demo capture payload', { slug, handle, platform, identityConsent, deviceMetadata });
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <main className="min-h-screen bg-midnight px-5 py-10 text-white">
        <Card className="mx-auto max-w-sm text-center">
          <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-cyberGold" />
          <h1 className="text-2xl font-black">Vibe Check Complete</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Your signal was submitted. Only the information you agreed to share can appear in the radar report.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyberGold">Al-Muraqib</p>
            <h1 className="mt-2 text-3xl font-black">Social Vibe Check</h1>
          </div>
          <div className="relative grid h-14 w-14 place-items-center rounded-full border border-yellow-400/30 bg-yellow-400/10">
            <Radar className="h-7 w-7 text-cyberGold" />
            <span className="absolute inset-0 animate-ping rounded-full border border-yellow-400/30" />
          </div>
        </div>

        <form onSubmit={submit}>
          <Card>
            <div className="mb-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 shrink-0 text-cyberGold" />
                <p className="text-sm leading-6 text-slate-200">
                  By continuing, your handle, platform, browser/device type, timezone, and coarse region may be shared with the link creator. No exact GPS or private platform data is collected.
                </p>
              </div>
            </div>

            <label className="mb-2 block text-sm font-semibold text-slate-200">Your handle</label>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="@yourhandle"
              className="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none ring-yellow-400/30 placeholder:text-slate-500 focus:ring-4"
            />

            <label className="mb-2 block text-sm font-semibold text-slate-200">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="mb-5 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none ring-yellow-400/30 focus:ring-4"
            >
              <option value="instagram">Instagram</option>
              <option value="snapchat">Snapchat</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="tiktok">TikTok</option>
              <option value="telegram">Telegram</option>
              <option value="other">Other</option>
            </select>

            <label className="mb-3 flex items-start gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>I agree to share my submitted handle and basic device metadata for this vibe check.</span>
            </label>

            <label className="mb-6 flex items-start gap-3 text-sm text-slate-300">
              <input type="checkbox" checked={identityConsent} onChange={(e) => setIdentityConsent(e.target.checked)} className="mt-1" />
              <span>I allow optional identity matching against contacts imported by the link creator.</span>
            </label>

            <Button type="submit" disabled={!consent || !handle.trim() || loading} className="w-full">
              {loading ? 'Scanning...' : 'Run Vibe Check'}
            </Button>
          </Card>
        </form>
      </div>
    </main>
  );
}
