import { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
      <Icon className="mb-3 h-5 w-5 text-cyberGold" />
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-[11px] leading-4 text-slate-400">{label}</p>
    </div>
  );
}
