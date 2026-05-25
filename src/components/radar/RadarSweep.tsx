import { Radar } from 'lucide-react';

export function RadarSweep() {
  return (
    <div className="relative mx-auto grid h-64 w-64 place-items-center rounded-full border border-yellow-400/20 bg-slate-900/40">
      <div className="absolute h-52 w-52 rounded-full border border-yellow-400/10" />
      <div className="absolute h-36 w-36 rounded-full border border-yellow-400/10" />
      <div className="absolute h-20 w-20 rounded-full border border-yellow-400/10" />
      <div className="absolute left-1/2 top-1/2 h-1/2 w-[2px] origin-top animate-radarSweep bg-gradient-to-b from-yellow-400 to-transparent" />
      <div className="z-10 grid h-20 w-20 place-items-center rounded-full border border-yellow-400/40 bg-yellow-400/10">
        <Radar className="h-9 w-9 animate-scanPulse text-yellow-400" />
      </div>
      <span className="absolute left-12 top-16 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]" />
      <span className="absolute bottom-20 right-16 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.9)]" />
      <span className="absolute bottom-28 left-20 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
    </div>
  );
}
