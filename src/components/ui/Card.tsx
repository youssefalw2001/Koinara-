import { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[2rem] border border-slate-800 bg-slate-950/90 p-5 shadow-2xl shadow-black/30 ${className}`}
      {...props}
    />
  );
}
