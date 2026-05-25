import { Activity, Eye, Flame, Lock, Shield } from 'lucide-react';
import { DecryptionReveal } from '../components/radar/DecryptionReveal';
import { RadarSweep } from '../components/radar/RadarSweep';
import { ThermalHeatmap } from '../components/radar/ThermalHeatmap';
import { TrustGraph } from '../components/radar/TrustGraph';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { demoInteractions } from '../data/demoRadar';

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-midnight px-4 py-6 text-white">
      <div className="mx-auto max-w-md">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyberGold">Al-Muraqib</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Social Radar</h1>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10">
            <Shield className="h-6 w-6 text-cyberGold" />
          </div>
        </header>

        <Card className="relative mb-6 overflow-hidden border-yellow-400/20 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.14),transparent_58%)]" />
          <div className="relative">
            <RadarSweep />
            <div className="mt-5 text-center">
              <p className="text-sm uppercase tracking-[0.28em] text-cyberGold">Scanning active signals</p>
              <p className="mt-2 text-sm text-slate-400">Opt-in behavioral intelligence from your radar links.</p>
            </div>
          </div>
        </Card>

        <section className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Observer Signals" value="128" icon={Eye} />
          <StatCard label="High-Interest" value="17" icon={Flame} />
          <StatCard label="Identity Hints" value="6" icon={Lock} />
        </section>

        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">Thermal Activity</h2>
              <p className="text-sm text-slate-400">Peak observer windows by hour.</p>
            </div>
            <Activity className="h-5 w-5 text-cyberGold" />
          </div>
          <ThermalHeatmap />
        </Card>

        <section className="mb-6">
          <h2 className="mb-3 text-lg font-black">Trust Graph</h2>
          <TrustGraph />
        </section>

        <Card className="mb-6 border-yellow-400/20">
          <DecryptionReveal />
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-black">Latest Signals</h2>
          <div className="space-y-3">
            {demoInteractions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-black">@{item.handle}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.platform}</p>
                  </div>
                  <div className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-black text-cyberGold">{item.score}/100</div>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.label} - {item.device}</p>
                <p className="mt-1 text-xs text-slate-500">{item.timezone} - {item.lastSeen}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
