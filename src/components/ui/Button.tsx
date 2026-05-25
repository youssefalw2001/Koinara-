import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
};

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-cyberGold text-midnight shadow-lg shadow-yellow-400/20',
    ghost: 'border border-slate-700 bg-slate-950 text-white',
    danger: 'bg-alertRed text-white shadow-lg shadow-red-500/20',
  };

  return (
    <button
      className={`rounded-2xl px-5 py-3 font-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
