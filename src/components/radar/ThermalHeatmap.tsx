import { heatmapHours } from '../../data/demoRadar';

function intensityClass(value: number) {
  if (value >= 80) return 'bg-alertRed shadow-[0_0_18px_rgba(239,68,68,0.45)]';
  if (value >= 55) return 'bg-cyberGold shadow-[0_0_18px_rgba(250,204,21,0.35)]';
  if (value >= 30) return 'bg-cyan-400/80';
  if (value >= 10) return 'bg-slate-600';
  return 'bg-slate-800';
}

export function ThermalHeatmap() {
  return (
    <div>
      <div className="grid grid-cols-6 gap-2">
        {heatmapHours.map((value, index) => (
          <div
            key={index}
            title={`${index}:00 - ${value}% activity`}
            className={`aspect-square rounded-xl ${intensityClass(value)}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:00</span>
      </div>
    </div>
  );
}
