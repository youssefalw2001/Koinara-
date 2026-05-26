import { Link } from 'react-router-dom';
import { Crown, Eye, Radar, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const mockTop = [
  { rank: 1, title: 'Crown King', handle: '@faisal_dxb', points: '2,400', signal: 'Returned 7x' },
  { rank: 2, title: 'Diamond Prince', handle: 'Masked Observer', points: '1,850', signal: 'High Signal' },
  { rank: 3, title: 'Golden Guard', handle: '@m7md', points: '1,220', signal: 'Boosted' },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-midnight px-5 py-6 text-white">
      <section className="mx-auto max-w-md pb-10">
        <nav className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-cyberGold">
              <Radar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xl font-black tracking-tight">Al-Muraqib</p>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Social Radar</p>
            </div>
          </div>
          <Link to="/dashboard" className="text-sm font-bold text-cyberGold">Dashboard</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.24),transparent_42%),radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_42%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              The Observer Intelligence Suite
            </p>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em]">Create your Social Radar. Find your Crown Council.</h1>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Post your radar link, collect observer signals, and see who enters your circle. Crushes, exes, masked observers, and Top 3 status in one viral link.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link to="/create">
                <Button className="w-full">Create Radar</Button>
              </Link>
              <Link to="/r/noura">
                <Button variant="ghost" className="w-full">View Demo</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="mb-5 border-cyan-300/10 bg-slate-950/95">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Live Radar Preview</p>
              <h2 className="mt-1 text-xl font-black">Signals forming tonight</h2>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Eye className="h-5 w-5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
              <p className="text-2xl font-black">128</p>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Observers</p>
            </div>
            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3">
              <p className="text-2xl font-black text-cyberGold">87</p>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-yellow-100/70">Signal</p>
            </div>
            <div className="rounded-2xl border border-purple-300/20 bg-purple-300/10 p-3">
              <p className="text-2xl font-black text-purple-200">17</p>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-purple-100/70">Boosts</p>
            </div>
          </div>
        </Card>

        <Card className="mb-5 border-yellow-400/20 bg-slate-950/95">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300 to-cyan-300 text-xl font-black text-slate-950">N</div>
            <div>
              <h2 className="font-black">Noura's Radar</h2>
              <p className="text-sm text-slate-400">Crush Radar · “Do I cross your mind?”</p>
            </div>
          </div>
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyberGold">Crown Council</p>
              <p className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">LIVE</p>
            </div>
            <div className="mt-4 space-y-3">
              {mockTop.map((item) => (
                <div key={item.rank} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyberGold text-sm font-black text-midnight">{item.rank}</div>
                    <div>
                      <p className="font-black">{item.handle}</p>
                      <p className="text-xs text-slate-500">{item.title} · {item.signal}</p>
                    </div>
                  </div>
                  <p className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">{item.points}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <section className="grid gap-3">
          {[
            { icon: Radar, title: 'Social Radar links', body: 'Create a story-ready radar link for crushes, exes, signal checks, or general observers.' },
            { icon: Eye, title: 'Observer signals', body: 'Track masked/public entries, answers, repeat visits, and high-interest behavior.' },
            { icon: Crown, title: 'Crown Council', body: 'Your Top 3 observers become Crown King, Diamond Prince, and Golden Guard.' },
            { icon: TrendingUp, title: 'Paid boosts', body: 'Observers can boost rank, defend Top 3, or stay discreet with masked mode.' },
            { icon: Users, title: 'Viral Verdict', body: 'After someone enters a radar, they are pushed to create their own link.' },
            { icon: ShieldCheck, title: 'Consent-first reveals', body: 'No hacking or identity exposure. Reveals stay request-based and consent-led.' },
            { icon: Sparkles, title: 'GCC-first design', body: 'Built for Snap, TikTok, Instagram, WhatsApp, and story-link culture.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex gap-4 rounded-3xl p-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-cyberGold" />
                <div>
                  <h2 className="font-black">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
              </Card>
            );
          })}
        </section>
      </section>
    </main>
  );
}
