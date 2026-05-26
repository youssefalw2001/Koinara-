import { Link } from 'react-router-dom';
import { Crown, Gift, ShieldCheck, Sparkles, Trophy, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const mockTop = [
  { rank: 1, handle: '@faisal_dxb', points: '2,400', gift: 'Crown Entry' },
  { rank: 2, handle: '@khaled.9', points: '1,850', gift: 'Diamond Entry' },
  { rank: 3, handle: '@m7md', points: '1,220', gift: 'Golden Entry' },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-midnight px-5 py-6 text-white">
      <section className="mx-auto max-w-md pb-10">
        <nav className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-lg font-black text-cyberGold">D</div>
            <div>
              <p className="text-xl font-black tracking-tight">Daira</p>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">Circle Teams</p>
            </div>
          </div>
          <Link to="/pricing" className="text-sm font-bold text-cyberGold">Gifts</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.22),transparent_42%),radial-gradient(circle_at_top_right,rgba(192,132,252,0.12),transparent_40%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              GCC-first creator circle game
            </p>
            <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.06em]">Create your Circle. Let them prove their spot.</h1>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Creators start a Circle, set Top 3 rewards, and supporters send Golden Entries to climb the leaderboard and become Crown Holders.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link to="/create">
                <Button className="w-full">Start Circle</Button>
              </Link>
              <Link to="/c/noura">
                <Button variant="ghost" className="w-full">Join Demo</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="mb-5 border-yellow-400/20 bg-slate-950/95">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300 to-purple-400 text-xl font-black text-slate-950">N</div>
            <div>
              <h2 className="font-black">Noura's Circle</h2>
              <p className="text-sm text-slate-400">Riyadh · rewards end tonight</p>
            </div>
          </div>
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyberGold">Circle Pulse</p>
              <p className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">LIVE</p>
            </div>
            <p className="mt-3 text-4xl font-black tracking-tight text-cyberGold">8,420</p>
            <p className="text-xs text-slate-400">team points today</p>
          </div>
          <div className="mt-4 space-y-3">
            {mockTop.map((item) => (
              <div key={item.rank} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyberGold text-sm font-black text-midnight">{item.rank}</div>
                  <div>
                    <p className="font-black">{item.handle}</p>
                    <p className="text-xs text-slate-500">{item.gift}</p>
                  </div>
                </div>
                <p className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">{item.points}</p>
              </div>
            ))}
          </div>
        </Card>

        <section className="grid gap-3">
          {[
            { icon: Crown, title: 'Top 3 Crown Holders', body: 'Supporters compete for #1, #2, and #3 in each creator Circle.' },
            { icon: Gift, title: 'Golden Entries', body: 'Gifts add points, push rank, and place supporters inside the Golden Inbox.' },
            { icon: Trophy, title: 'Creator-set rewards', body: 'Creators choose what Top 3 unlock: reactions, highlighted messages, badges, or reply requests.' },
            { icon: ShieldCheck, title: 'Safe by design', body: 'No phone numbers, private Snap, adult rewards, or forced off-platform access.' },
            { icon: Users, title: '30% creator share later', body: 'After validation, creators can earn a controlled share of gift revenue.' },
            { icon: Sparkles, title: 'PWA-first', body: 'Story links open instantly in the browser before native apps are needed.' },
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
