import { Link } from 'react-router-dom';
import { Crown, Radar, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function ViralVerdictPage() {
  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Al-Muraqib</Link>
          <Link to="/dashboard" className="text-sm font-bold text-slate-300">Dashboard</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.22),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.12),transparent_45%)]" />
          <div className="relative text-center">
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[2rem] border border-yellow-400/30 bg-yellow-400/10 text-cyberGold shadow-radar">
              <Radar className="h-10 w-10" />
            </div>
            <p className="mb-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
              Viral Verdict
            </p>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em]">You entered their Radar.</h1>
            <p className="mt-5 text-3xl font-black tracking-tight text-cyberGold">Create yours next.</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Your Observer Score has been logged. Start your own Social Radar and see who enters your circle.
            </p>
          </div>
        </Card>

        <Card className="mb-5 border-yellow-400/20 bg-yellow-400/5">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-cyberGold">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-4xl font-black text-cyberGold">12</p>
              <p className="text-sm leading-6 text-slate-300">observers could be waiting on your radar tonight.</p>
            </div>
          </div>
        </Card>

        <Card className="mb-5 border-purple-400/10 bg-purple-400/5">
          <div className="mb-4 flex items-center gap-2 text-purple-200">
            <Crown className="h-5 w-5" />
            <h2 className="font-black">Your Crown Council could be forming</h2>
          </div>
          <div className="grid gap-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">#1 Crown King — highest signal</div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">#2 Diamond Prince — strong repeat signal</div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">#3 Golden Guard — boosted observer</div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-3">
          <Link to="/create"><Button className="w-full">Create My Radar</Button></Link>
          <Link to="/council"><Button variant="ghost" className="w-full">View Crown Council</Button></Link>
        </div>

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Entertainment only. Observer signals are based on opt-in activity, public/masked entries, and consent-based reveal requests.
        </Card>

        <Link to="/r/noura" className="mt-6 flex items-center justify-center gap-2 text-sm font-black text-cyberGold">
          Try demo radar <Sparkles className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
