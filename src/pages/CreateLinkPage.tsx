import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Link2, Radar, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { createCircle, normalizeSlug } from '../lib/daira';
import { hasSupabaseConfig } from '../lib/supabase';

const radarModes = {
  general: {
    label: 'General Radar',
    question: 'Who is watching my story?',
    answers: ['New observer', 'I check sometimes', 'I came back', 'Not answering'],
  },
  crush: {
    label: 'Crush Radar',
    question: 'Do I cross your mind?',
    answers: ['Never', 'Sometimes', 'More than I should', 'I’m not answering that'],
  },
  unfinished: {
    label: 'Unfinished Radar',
    question: 'Would you reply if I texted?',
    answers: ['Yes', 'Maybe', 'Depends how you text', 'No'],
  },
  signal: {
    label: 'Signal Check',
    question: 'What is my vibe to you?',
    answers: ['Friend', 'Interesting', 'Mysterious', 'Secret crush'],
  },
};

type RadarMode = keyof typeof radarModes;

export function CreateLinkPage() {
  const [displayName, setDisplayName] = useState('Noura');
  const [username, setUsername] = useState('noura');
  const [slug, setSlug] = useState('noura');
  const [city, setCity] = useState('Riyadh');
  const [country, setCountry] = useState('Saudi Arabia');
  const [radarMode, setRadarMode] = useState<RadarMode>('crush');
  const [question, setQuestion] = useState(radarModes.crush.question);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const selectedMode = useMemo(() => radarModes[radarMode], [radarMode]);

  function selectMode(mode: RadarMode) {
    setRadarMode(mode);
    setQuestion(radarModes[mode].question);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const safeSlug = normalizeSlug(slug) || normalizeSlug(displayName) || `radar-${Math.random().toString(36).slice(2, 8)}`;
      await createCircle({
        creatorName: displayName,
        username,
        title: `${displayName}'s Social Radar`,
        slug: safeSlug,
        city,
        country,
        reward1: 'Crown King status on my radar',
        reward2: 'Diamond Prince status on my radar',
        reward3: 'Golden Guard status on my radar',
      });
      const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
      setGeneratedUrl(`${baseUrl}/r/${safeSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create Radar. Check Supabase setup.');
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
          <Link to="/" className="text-sm font-black text-cyberGold">Al-Muraqib</Link>
          <Link to="/dashboard" className="text-sm font-bold text-slate-300">Dashboard</Link>
        </nav>

        <Card className="relative overflow-hidden border-yellow-400/20 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(103,232,249,0.10),transparent_42%)]" />
          <div className="relative mb-5 flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400/10 text-cyberGold">
              <Radar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyberGold">Create Radar</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">Set your Social Radar.</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">Choose a mode, ask a signal question, and share your radar link.</p>
            </div>
          </div>

          {!hasSupabaseConfig && (
            <div className="relative mb-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm leading-6 text-yellow-100">
              Supabase env keys are not set yet, so this screen previews locally. Add keys to save radars permanently.
            </div>
          )}

          <form onSubmit={submit} className="relative space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Display name</label>
                <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Radar slug</label>
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

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Radar mode</label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(radarModes) as RadarMode[]).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => selectMode(mode)}
                    className={`rounded-2xl border p-3 text-left text-sm font-black transition ${radarMode === mode ? 'border-yellow-400 bg-yellow-400/10 text-cyberGold' : 'border-slate-800 bg-slate-900/70 text-slate-300'}`}
                  >
                    {radarModes[mode].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Radar question</label>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20" />
            </div>

            <Card className="rounded-3xl border-cyan-300/10 bg-cyan-300/5 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Answer preview</p>
              <p className="mt-2 font-black text-white">{selectedMode.label}</p>
              <div className="mt-3 grid gap-2">
                {selectedMode.answers.map((answer) => (
                  <div key={answer} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-300">{answer}</div>
                ))}
              </div>
            </Card>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Launch My Radar'}
            </Button>
          </form>
        </Card>

        {error && <Card className="mt-5 border-red-400/20 bg-red-950/30 text-sm text-red-100">{error}</Card>}

        {generatedUrl && (
          <Card className="mt-5 border-yellow-400/20">
            <div className="mb-3 flex items-center gap-2 text-cyberGold">
              <Link2 className="h-5 w-5" />
              <h2 className="font-black">Your Social Radar is live</h2>
            </div>
            <p className="break-all rounded-2xl bg-slate-900 p-3 text-sm text-slate-200">{generatedUrl}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button onClick={copyLink} className="w-full">
                <Copy className="mr-2 inline h-4 w-4" /> Copy
              </Button>
              <Link to={`/r/${normalizeSlug(slug) || 'noura'}`}>
                <Button variant="ghost" className="w-full">Open</Button>
              </Link>
            </div>
          </Card>
        )}

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Al-Muraqib is entertainment-first social radar. No hacking, no private contact selling, and reveal requests must be consent-based.
        </Card>
      </div>
    </main>
  );
}
