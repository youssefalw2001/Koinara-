import { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[2rem] border border-yellow-400/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/[0.03] ${className}`}
      {...props}
    />
  );
}
