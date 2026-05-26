import { Crown, Gem, Shield, Sparkles, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export type CrownCouncilMember = {
  rank: number;
  handle: string;
  title?: string;
  platform?: string;
  gift?: string;
  points: number;
  message?: string | null;
  isMasked?: boolean;
};

type CrownCouncilLeaderboardProps = {
  queenName: string;
  members: CrownCouncilMember[];
  onBoost?: (member: CrownCouncilMember) => void;
  onInvite?: (member: CrownCouncilMember) => void;
  showActions?: boolean;
};

function getCouncilTitle(rank: number, fallback?: string) {
  if (fallback) return fallback;
  if (rank === 1) return 'Crown King';
  if (rank === 2) return 'Diamond Prince';
  if (rank === 3) return 'Golden Guard';
  return 'Royal Observer';
}

function getCouncilIcon(rank: number) {
  if (rank === 1) return Crown;
  if (rank === 2) return Gem;
  if (rank === 3) return Shield;
  return Sparkles;
}

function getRingClass(rank: number) {
  if (rank === 1) return 'border-yellow-400/40 bg-yellow-400/10 text-cyberGold';
  if (rank === 2) return 'border-cyan-300/30 bg-cyan-300/10 text-cyan-200';
  if (rank === 3) return 'border-purple-300/30 bg-purple-300/10 text-purple-200';
  return 'border-slate-800 bg-slate-900/70 text-slate-300';
}

export function CrownCouncilLeaderboard({ queenName, members, onBoost, onInvite, showActions = true }: CrownCouncilLeaderboardProps) {
  const sortedMembers = [...members].sort((a, b) => b.points - a.points).map((member, index) => ({ ...member, rank: index + 1 }));
  const topThree = sortedMembers.slice(0, 3);
  const nextUp = sortedMembers[3];

  return (
    <Card className="border-yellow-400/20 bg-slate-950/95">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyberGold">Crown Council</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">{queenName}'s Top 3</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Paid gifts move supporters into Crown King, Diamond Prince, and Golden Guard.</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-cyberGold">
          <Crown className="h-6 w-6" />
        </div>
      </div>

      <div className="grid gap-3">
        {topThree.map((member) => {
          const Icon = getCouncilIcon(member.rank);
          const title = getCouncilTitle(member.rank, member.title);
          const displayHandle = member.isMasked ? 'Masked Observer' : member.handle;
          return (
            <div key={`${member.rank}-${member.handle}`} className={`rounded-3xl border p-4 ${getRingClass(member.rank)}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-950/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-black text-white">#{member.rank}</p>
                      <p className="rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em]">{title}</p>
                    </div>
                    <p className="mt-1 font-black text-white">{displayHandle}</p>
                    <p className="text-xs text-slate-400">{member.gift || 'Paid Gift'}{member.platform ? ` · ${member.platform}` : ''}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-cyberGold">{member.points.toLocaleString()}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">points</p>
                </div>
              </div>

              {member.message && (
                <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/75 p-3 text-sm leading-6 text-slate-300">“{member.message}”</p>
              )}

              {showActions && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button type="button" onClick={() => onBoost?.(member)} className="w-full">
                    <TrendingUp className="mr-2 inline h-4 w-4" /> Boost
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => onInvite?.(member)} className="w-full">
                    Royal Invite
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {nextUp && (
        <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Next challenger</p>
              <p className="mt-1 font-black">{nextUp.isMasked ? 'Masked Observer' : nextUp.handle}</p>
              <p className="text-sm text-slate-400">Only {(topThree[2]?.points || 0) - nextUp.points + 1} points from Top 3.</p>
            </div>
            <p className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">#{nextUp.rank}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
