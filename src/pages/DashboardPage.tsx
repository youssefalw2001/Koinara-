import { Link } from 'react-router-dom';
import { Crown, Gift, Inbox, ShieldCheck, Sparkles, Swords, Trophy, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const leaderboard = [
  { rank: 1, title: 'Crown King', handle: '@faisal_dxb', platform: 'Snapchat', gift: 'Crown Entry', points: 2400, message: 'Crown spot is mine.' },
  { rank: 2, title: 'Diamond Prince', handle: '@khaled.9', platform: 'Instagram', gift: 'Diamond Entry', points: 1850, message: 'Golden entry for the win.' },
  { rank: 3, title: 'Golden Guard', handle: '@m7md', platform: 'TikTok', gift: 'Golden Entry', points: 1220, message: 'Top 3 tonight.' },
  { rank: 4, title: 'Royal Supporter', handle: '@saud', platform: 'Snapchat', gift: 'Rose Entry', points: 740, message: 'Coming for top 3.' },
];

export function DashboardPage() {
  const totalPoints = leaderboard.reduce((sum, entry) => sum + entry.points, 0);
  const projectedCreatorShare = 38.7;

  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <div className="flex gap-4">
            <Link to="/queens" className="text-sm font-bold text-slate-300">Queens</Link>
            <Link to="/kings" className="text-sm font-bold text-slate-300">Kings</Link>
          </div>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.2),transparent_46%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.12),transparent_44%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              Queen dashboard
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight">Queen Noura is #1 today.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">Your Crown Council is competing while your Circle climbs the Daily Queen Battle.</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3">
                <p className="text-2xl font-black">243</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Entries</p>
              </div>
              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-3">
                <p className="text-2xl font-black text-cyberGold">#1</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-yellow-100/70">Queen Rank</p>
              </div>
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3">
                <p className="text-2xl font-black text-cyan-200">06h</p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cyan-100/70">Left</p>
              </div>
            </div>
          </div>
        </Card>

        <section className="mb-5 grid grid-cols-2 gap-3">
          {[
            { icon: Trophy, label: 'Queen Score', value: totalPoints.toLocaleString(), tone: 'text-cyberGold' },
            { icon: Gift, label: 'Projected 30%', value: `$${projectedCreatorShare.toFixed(2)}`, tone: 'text-emerald-300' },
            { icon: Users, label: 'Royal Invites', value: '4', tone: 'text-cyan-200' },
            { icon: Crown, label: 'Crown Council', value: '3', tone: 'text-purple-300' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-3xl p-4">
                <Icon className={`mb-3 h-5 w-5 ${item.tone}`} />
                <p className={`text-2xl font-black ${item.tone}`}>{item.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
              </Card>
            );
          })}
        </section>

        <Card className="mb-5 border-yellow-400/10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-black"><Trophy className="h-5 w-5 text-cyberGold" /> Crown Council</h2>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Top 3 win</p>
          </div>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div key={entry.handle} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-black ${entry.rank <= 3 ? 'bg-cyberGold text-midnight' : 'bg-slate-800 text-slate-300'}`}>{entry.rank}</div>
                    <div>
                      <p className="font-black">{entry.handle}</p>
                      <p className="text-xs text-slate-500">{entry.title} · {entry.gift} · {entry.platform}</p>
                    </div>
                  </div>
                  <p className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">{entry.points}</p>
                </div>
                <p className="mt-3 rounded-2xl bg-slate-950/70 p-3 text-sm text-slate-300">“{entry.message}”</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-5 border-purple-400/20 bg-purple-400/5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black"><Swords className="h-5 w-5 text-purple-300" /> Royal Invite Board</h2>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <p><b className="text-cyberGold">@anon_king</b> is #5 on the King leaderboard. Invite him to help defend your Queen rank.</p>
            <p><b className="text-cyberGold">@saud</b> is #4 in your Circle and close to entering the Crown Council.</p>
            <p><b className="text-cyberGold">@khaled.9</b> can pass your Crown King with one Crown Entry.</p>
          </div>
          <Link to="/kings"><Button className="mt-4 w-full">Recruit Kings</Button></Link>
        </Card>

        <Card className="mb-5 border-yellow-400/20 bg-yellow-400/5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-black"><Sparkles className="h-5 w-5 text-cyberGold" /> Queen Pulse share card</h2>
          <div className="rounded-3xl border border-yellow-400/20 bg-slate-950/80 p-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-cyberGold">Queen Noura</p>
            <p className="mt-3 text-3xl font-black">#1 in Riyadh 👑</p>
            <p className="mt-3 text-sm text-slate-400">Crown King: @faisal_dxb</p>
            <p className="mt-1 text-sm text-slate-400">6 hours left to defend the throne.</p>
          </div>
          <Link to="/c/noura"><Button className="mt-4 w-full">Open public Circle</Button></Link>
        </Card>

        <Card className="flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Creator controls are required before payouts: hide entry, block supporter, report content, 18+ confirmation, and approved reward types.
        </Card>
      </div>
    </main>
  );
}
