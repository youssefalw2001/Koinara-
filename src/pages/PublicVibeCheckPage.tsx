import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Crown, Gift, ShieldCheck, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { fetchCircleBySlug, fetchLeaderboard, formatMoney, joinCircle, type LeaderboardEntry } from '../lib/daira';
import { giftTypes, hasSupabaseConfig } from '../lib/supabase';

type CircleContext = Awaited<ReturnType<typeof fetchCircleBySlug>>;

export function PublicVibeCheckPage() {
  const { slug = 'noura' } = useParams();
  const [context, setContext] = useState<CircleContext | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [handle, setHandle] = useState('');
  const [platform, setPlatform] = useState('Snapchat');
  const [message, setMessage] = useState('');
  const [giftId, setGiftId] = useState('golden');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const selectedGift = useMemo(() => giftTypes.find((gift) => gift.id === giftId) || giftTypes[0], [giftId]);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchCircleBySlug(slug);
        const rows = await fetchLeaderboard(data.circle.id);
        if (!active) return;
        setContext(data);
        setLeaderboard(rows);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Circle not found.');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [slug]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!context) return;
    if (!handle.trim()) {
      setError('Enter your handle first.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const response = await joinCircle({ circleId: context.circle.id, handle, platform, message, giftId });
      const updated = await fetchLeaderboard(context.circle.id);
      const merged = response.configured ? updated : [response.entry as LeaderboardEntry, ...updated];
      const sorted = merged.sort((a, b) => b.points - a.points);
      const rank = sorted.findIndex((entry) => entry.id === response.entry.id) + 1;
      setLeaderboard(sorted);
      setResult(`${response.gift.label} submitted. You are currently #${rank || sorted.length} in ${context.creator.display_name}'s Circle.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit entry.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-midnight px-5 text-white"><p className="text-sm text-slate-400">Loading Circle...</p></main>;
  }

  if (!context) {
    return <main className="grid min-h-screen place-items-center bg-midnight px-5 text-white"><Card>{error || 'Circle not found.'}</Card></main>;
  }

  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <Link to="/create" className="text-sm font-bold text-slate-300">Start yours</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_52%)]" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-yellow-300 to-purple-400 text-2xl font-black text-slate-950">
                {context.creator.display_name.slice(0, 1)}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyberGold">Live Circle</p>
                <h1 className="text-2xl font-black tracking-tight">{context.circle.title}</h1>
                <p className="text-sm text-slate-400">{context.creator.city || 'GCC'} · Top 3 rewards active</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-300">Join the Circle, send a Golden Entry, and compete for Crown Holder status.</p>
            {!hasSupabaseConfig && <p className="mt-3 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3 text-xs leading-5 text-yellow-100">Supabase is not connected yet, so this page is running in local preview mode until env keys are added.</p>}
          </div>
        </Card>

        <Card className="mb-5 border-yellow-400/10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-black">Current Top 3</h2>
            <Trophy className="h-5 w-5 text-cyberGold" />
          </div>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyberGold text-sm font-black text-midnight">{index + 1}</div>
                  <div>
                    <p className="font-black">{entry.supporter_handle}</p>
                    <p className="text-xs text-slate-500">{entry.platform}</p>
                  </div>
                </div>
                <p className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">{entry.points}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-5 border-purple-400/10">
          <h2 className="mb-3 flex items-center gap-2 font-black"><Crown className="h-5 w-5 text-cyberGold" /> Top 3 rewards</h2>
          <div className="space-y-2 text-sm text-slate-300">
            {context.rewards.map((reward) => (
              <p key={reward.rank} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3"><b className="text-cyberGold">#{reward.rank}</b> {reward.reward_title}</p>
            ))}
          </div>
        </Card>

        <form onSubmit={submit}>
          <Card className="border-yellow-400/20">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Gift className="h-5 w-5 text-cyberGold" /> Send your entry</h2>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Handle</label>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@yourhandle" className="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-yellow-400/20" />

            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/20">
              <option>Snapchat</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>WhatsApp</option>
              <option>Telegram</option>
            </select>

            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Optional highlighted message" className="mb-4 min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-yellow-400/20" />

            <div className="mb-5 grid gap-3">
              {giftTypes.map((gift) => (
                <button
                  type="button"
                  key={gift.id}
                  onClick={() => setGiftId(gift.id)}
                  className={`rounded-2xl border p-4 text-left transition ${giftId === gift.id ? 'border-yellow-400 bg-yellow-400/10' : 'border-slate-800 bg-slate-900/60'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-black">{gift.label}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{gift.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-cyberGold">{gift.points}</p>
                      <p className="text-xs text-slate-500">{formatMoney(gift.amountCents)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Submitting...' : `Send ${selectedGift.label}`}
            </Button>
          </Card>
        </form>

        {error && <Card className="mt-5 border-red-400/20 bg-red-950/30 text-sm text-red-100">{error}</Card>}
        {result && <Card className="mt-5 border-emerald-400/20 bg-emerald-400/5 text-sm leading-6 text-emerald-50">{result}<Link to="/dashboard" className="mt-3 block font-black text-cyberGold">View Circle dashboard</Link></Card>}

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Daira rewards stay inside the app. Do not request phone numbers, private Snap, adult content, meetups, or off-platform access.
        </Card>
      </div>
    </main>
  );
}
