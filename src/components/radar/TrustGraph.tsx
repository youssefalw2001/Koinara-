const nodes = [
  { label: 'Known', className: 'left-6 top-10 border-yellow-400/40 text-yellow-300' },
  { label: 'Repeat', className: 'right-4 top-16 border-red-400/40 text-red-300' },
  { label: 'Fast', className: 'left-10 bottom-12 border-cyan-300/40 text-cyan-200' },
  { label: 'Unknown', className: 'right-9 bottom-8 border-slate-400/40 text-slate-300' },
];

export function TrustGraph() {
  return (
    <div className="relative h-64 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 radar-grid">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/10" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/15" />
      <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-yellow-400 text-center text-xs font-black text-slate-950">
        YOU
      </div>
      {nodes.map((node) => (
        <div
          key={node.label}
          className={`absolute rounded-full border bg-slate-900 px-3 py-2 text-xs font-bold ${node.className}`}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
