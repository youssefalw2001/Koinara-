import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Crown, Link2, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { createCircle, normalizeSlug } from '../lib/daira';
import { hasSupabaseConfig } from '../lib/supabase';

export function CreateLinkPage() {
  const [creatorName, setCreatorName] = useState('Noura');
  const [username, setUsername] = useState('noura');
  const [title, setTitle] = useState("Noura's Circle");
  const [slug, setSlug] = useState('noura');
  const [city, setCity] = useState('Riyadh');
  const [country, setCountry] = useState('Saudi Arabia');
  const [reward1, setReward1] = useState('Voice thank-you + pinned Crown spot for 24h');
  const [reward2, setReward2] = useState('Highlighted message + creator reaction');
  const [reward3, setReward3] = useState('Top 3 badge + Circle Pulse mention');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const safeSlug = normalizeSlug(slug) || normalizeSlug(creatorName) || `circle-${Math.random().toString(36).slice(2, 8)}`;
      await createCircle({ creatorName, username, title, slug: safeSlug, city, country, reward1, reward2, reward3 });
      const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
      setGeneratedUrl(`${baseUrl}/c/${safeSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create Circle. Check Supabase setup.');
    } finally {
      setLoading(false);
    }
  }

  async function copyLink() {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
  }

  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <Link to="/dashboard" className="text-sm font-bold text-slate-300">Dashboard</Link>
        </nav>

        <Card className="border-yellow-400/20 bg-slate-950">
          <div className="mb-5 flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400/10 text-cyberGold">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyberGold">Creator setup</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">Build your Circle.</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">Set your public Circle page, Top 3 rewards, and share link.</p>
            </div>
          </div>

          {!hasSupabaseConfig && (
            <div className="mb-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm leading-6 text-yellow-100">
              Supabase env keys are not set yet, so this screen previews the real flow locally. Add your keys to save Circles permanently.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Creator name</label>
                <input value={creatorName} onChange={(e) => setCreatorName(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Circle title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Circle slug</label>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="noura" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-yellow-400/20" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">City</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Country</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
            </div>

            {[reward1, reward2, reward3].map((reward, index) => (
              <div key={index}>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">#{index + 1} reward</label>
                <input
                  value={reward}
                  onChange={(e) => [setReward1, setReward2, setReward3][index](e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20"
                />
              </div>
            ))}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Create Circle'}
            </Button>
          </form>
        </Card>

        {error && <Card className="mt-5 border-red-400/20 bg-red-950/30 text-sm text-red-100">{error}</Card>}

        {generatedUrl && (
          <Card className="mt-5 border-yellow-400/20">
            <div className="mb-3 flex items-center gap-2 text-cyberGold">
              <Link2 className="h-5 w-5" />
              <h2 className="font-black">Your Circle link is ready</h2>
            </div>
            <p className="break-all rounded-2xl bg-slate-900 p-3 text-sm text-slate-200">{generatedUrl}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button onClick={copyLink} className="w-full">
                <Copy className="mr-2 inline h-4 w-4" /> Copy
              </Button>
              <Link to={`/c/${normalizeSlug(slug) || 'noura'}`}>
                <Button variant="ghost" className="w-full">Open</Button>
              </Link>
            </div>
          </Card>
        )}

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Rewards must stay inside Daira: no phone numbers, private Snap, adult content, meetups, or forced off-platform access.
        </Card>
      </div>
    </main>
  );
}
