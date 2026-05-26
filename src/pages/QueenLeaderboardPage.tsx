import { Link } from 'react-router-dom';
import { Crown, Flame, ShieldCheck, Trophy, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const queens = [
  { rank: 1, name: 'Noura', city: 'Riyadh', points: 84200, council: '@faisal_dxb', change: '+12.4k today' },
  { rank: 2, name: 'Sara', city: 'Kuwait', points: 72900, council: '@khaled.9', change: '+9.8k today' },
  { rank: 3, name: 'Lama', city: 'Dubai', points: 61400, council: '@m7md', change: '+8.1k today' },
  { rank: 4, name: 'Maha', city: 'Jeddah', points: 52250, council: '@saud', change: '+5.7k today' },
  { rank: 5, name: 'Dana', city: 'Doha', points: 44100, council: '@anon_king', change: '+4.2k today' },
];

export function QueenLeaderboardPage() {
  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <Link to="/kings" className="text-sm font-bold text-slate-300">Kings</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.20),transparent_54%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.12),transparent_40%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              Daily Queen Battle
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight">Top Queens today.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Queens climb by receiving paid gift points from their Circles. The board resets every 24h.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3">
                <Crown className="mb-2 h-5 w-5 text-cyberGold" />
                <p className="text-xl font-black text-cyberGold">24h</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-yellow-100/70">Battle</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3">
                <Users className="mb-2 h-5 w-5 text-cyan-200" />
                <p className="text-xl font-black text-cyan-200">5</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-100/70">Queens</p>
              </div>
              <div className="rounded-2xl border border-purple-300/20 bg-purple-300/10 p-3">
                <Flame className="mb-2 h-5 w-5 text-purple-200" />
                <p className="text-xl font-black text-purple-200">315k</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-100/70">Points</p>
              </div>
            </div>
          </div>
        </Card>

        <section className="space-y-3">
          {queens.map((queen) => (
            <Card key={queen.name} className={`rounded-3xl p-4 ${queen.rank === 1 ? 'border-yellow-400/30 bg-yellow-400/5' : ''}`}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl text-lg font-black ${queen.rank === 1 ? 'bg-cyberGold text-midnight' : 'bg-slate-800 text-slate-200'}`}>{queen.rank}</div>
                  <div>
                    <h2 className="text-lg font-black">Queen {queen.name}</h2>
                    <p className="text-xs text-slate-500">{queen.city} · Crown King {queen.council}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-cyberGold">{queen.points.toLocaleString()}</p>
                  <p className="text-xs text-emerald-300">{queen.change}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to={`/c/${queen.name.toLowerCase()}`}>
                  <Button className="w-full">Support</Button>
                </Link>
                <Button variant="ghost" className="w-full">Royal Invite</Button>
              </div>
            </Card>
          ))}
        </section>

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          This is a social gifting leaderboard, not betting. No wagers, cash prizes, or gambling language.
        </Card>

        <Link to="/create"><Button className="mt-5 w-full"><Trophy className="mr-2 inline h-4 w-4" /> Start your Queen Circle</Button></Link>
      </div>
    </main>
  );
}
