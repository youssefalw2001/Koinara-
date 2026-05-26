import { Link } from 'react-router-dom';
import { Crown, Gem, Shield, ShieldCheck, Swords, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const kings = [
  { rank: 1, handle: '@faisal_dxb', title: 'Crown King', points: 22000, queen: 'Noura', city: 'Riyadh' },
  { rank: 2, handle: '@khaled.9', title: 'Diamond Prince', points: 18500, queen: 'Sara', city: 'Kuwait' },
  { rank: 3, handle: '@saud', title: 'Golden Guard', points: 14200, queen: 'Maha', city: 'Jeddah' },
  { rank: 4, handle: '@m7md', title: 'Royal Supporter', points: 12100, queen: 'Lama', city: 'Dubai' },
  { rank: 5, handle: '@anon_king', title: 'Mystery King', points: 10400, queen: 'Dana', city: 'Doha' },
];

function titleIcon(rank: number) {
  if (rank === 1) return Crown;
  if (rank === 2) return Gem;
  if (rank === 3) return Shield;
  return Swords;
}

export function KingLeaderboardPage() {
  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <Link to="/queens" className="text-sm font-bold text-slate-300">Queens</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_54%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.10),transparent_40%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              Daily King Leaderboard
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight">Top Kings today.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Kings climb by sending real paid gifts across Queen Circles. Queens can recruit powerful Kings to help them win.
            </p>
          </div>
        </Card>

        <section className="space-y-3">
          {kings.map((king) => {
            const Icon = titleIcon(king.rank);
            return (
              <Card key={king.handle} className={`rounded-3xl p-4 ${king.rank === 1 ? 'border-yellow-400/30 bg-yellow-400/5' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl ${king.rank === 1 ? 'bg-cyberGold text-midnight' : 'bg-slate-800 text-slate-200'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black">{king.handle}</h2>
                      <p className="text-xs text-slate-500">{king.title} · supports Queen {king.queen}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-cyberGold">{king.points.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">#{king.rank}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-300">
                  Queens can recruit {king.handle} with a Royal Invite to join their Crown Council.
                </div>
              </Card>
            );
          })}
        </section>

        <Card className="mt-5 flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          King status is based on social gift points only. No betting, wagering, or cash-prize mechanics.
        </Card>

        <Link to="/pricing"><Button className="mt-5 w-full"><Trophy className="mr-2 inline h-4 w-4" /> View Gift Ladder</Button></Link>
      </div>
    </main>
  );
}
