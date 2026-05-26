import { Link } from 'react-router-dom';
import { Crown, Eye, Home, LayoutDashboard, Radar, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const mockTop = [
  { rank: 1, title: 'Crown King', handle: '@faisal_dxb', points: '9,842', signal: 'Returned 7x', tone: 'from-yellow-200 to-yellow-600' },
  { rank: 2, title: 'Diamond Prince', handle: 'Masked Observer', points: '7,512', signal: 'High Signal', tone: 'from-cyan-200 to-blue-500' },
  { rank: 3, title: 'Golden Guard', handle: '@m7md', points: '5,231', signal: 'Boosted', tone: 'from-orange-200 to-yellow-700' },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-5 text-white">
      <section className="relative mx-auto max-w-md pb-28">
        <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />

        <nav className="relative z-10 mb-6 flex items-center justify-between rounded-[1.7rem] border border-white/5 bg-slate-950/45 p-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-cyberGold shadow-radar">
              <Radar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black tracking-[-0.04em] gold-text">Al-Muraqib</p>
              <p className="mono text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300">Social Radar</p>
            </div>
          </div>
          <Link to="/dashboard" className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-xs font-black text-cyberGold">Suite</Link>
        </nav>

        <Card className="lux-panel relative mb-5 overflow-hidden p-0">
          <div className="absolute -right-16 -top-12 h-52 w-52 rounded-full border border-yellow-400/20" />
          <div className="absolute right-6 top-8 h-28 w-28 rounded-full border border-cyan-300/10" />
          <div className="p-5 pb-0">
            <p className="mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 mono text-[10px] font-bold uppercase tracking-[0.2em] text-cyberGold">
              The Observer Intelligence Suite
            </p>

            <div className="mb-6 grid grid-cols-[1fr_120px] items-start gap-3">
              <div>
                <h1 className="text-[3.15rem] font-black leading-[0.9] tracking-[-0.075em]">
                  Create your <span className="gold-text">Social Radar.</span>
                </h1>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Post one link. Collect observer signals. See who enters your circle and who fights for your Top 3.
                </p>
              </div>
              <div className="radar-orb mt-1 grid h-28 w-28 place-items-center rounded-full border border-yellow-400/20 shadow-radar">
                <div className="radar-sweep" />
                <Crown className="relative z-10 h-9 w-9 text-cyberGold drop-shadow-[0_0_18px_rgba(250,204,21,0.8)]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/create">
                <Button className="w-full">Create Radar</Button>
              </Link>
              <Link to="/r/noura">
                <Button variant="ghost" className="w-full">View Demo</Button>
              </Link>
            </div>
          </div>

          <div className="mt-6 border-t border-white/5 bg-slate-950/55 p-4">
            <p className="mono mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">Live Radar Preview</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-3">
                <Eye className="mb-2 h-4 w-4 text-cyan-200" />
                <p className="text-2xl font-black">128</p>
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-slate-500">Observers</p>
              </div>
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3">
                <Crown className="mb-2 h-4 w-4 text-cyberGold" />
                <p className="text-2xl font-black text-cyberGold">Top 3</p>
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-yellow-100/70">Active</p>
              </div>
              <div className="rounded-2xl border border-purple-300/20 bg-purple-300/10 p-3">
                <TrendingUp className="mb-2 h-4 w-4 text-purple-200" />
                <p className="text-2xl font-black text-purple-200">17</p>
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-purple-100/70">Boosts</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lux-panel relative mb-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_46%)]" />
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyberGold">Crown Council</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Noura's Top 3</h2>
              </div>
              <p className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 mono text-[10px] font-bold text-emerald-300">LIVE</p>
            </div>

            <div className="space-y-3">
              {mockTop.map((item) => (
                <div key={item.rank} className="group rounded-3xl border border-white/5 bg-slate-950/70 p-3 shadow-lg shadow-black/20">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${item.tone} text-lg font-black text-midnight shadow-lg shadow-yellow-400/10`}>
                        {item.rank}
                      </div>
                      <div>
                        <p className="font-black tracking-tight">{item.handle}</p>
                        <p className="text-xs text-slate-400">{item.title} · {item.signal}</p>
                      </div>
                    </div>
                    <p className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 mono text-xs font-bold text-cyberGold">{item.points}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <section className="grid gap-3">
          {[
            { icon: Radar, title: 'Radar modes', body: 'Crush Radar, Unfinished Radar, Signal Check, and General Observer Radar.' },
            { icon: Eye, title: 'Observer intelligence', body: 'Masked/public entries, answers, repeat signals, and high-interest behavior.' },
            { icon: ShieldCheck, title: 'Consent-first reveals', body: 'No hacking claims. Signals, boosts, and request-based reveal mechanics.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex gap-4 rounded-3xl border-white/5 bg-slate-950/55 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-cyberGold">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-black tracking-tight">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
              </Card>
            );
          })}
        </section>

        <div className="fixed bottom-4 left-1/2 z-30 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 grid-cols-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          {[
            { href: '/', icon: Home, label: 'Home', active: true },
            { href: '/create', icon: Radar, label: 'Radar' },
            { href: '/council', icon: Crown, label: 'Council' },
            { href: '/dashboard', icon: LayoutDashboard, label: 'Suite' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.href} className={`flex flex-col items-center justify-center gap-1 rounded-3xl py-2 text-[10px] font-black ${item.active ? 'bg-yellow-400/10 text-cyberGold' : 'text-slate-500'}`}>
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
