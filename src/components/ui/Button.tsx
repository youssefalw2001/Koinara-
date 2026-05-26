import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
};

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'border border-yellow-300/40 bg-gradient-to-br from-yellow-200 via-cyberGold to-yellow-600 text-midnight shadow-[0_12px_38px_rgba(250,204,21,0.24)] hover:shadow-[0_18px_48px_rgba(250,204,21,0.34)]',
    ghost: 'border border-cyan-300/20 bg-slate-950/70 text-white shadow-lg shadow-black/20 hover:border-cyan-200/40 hover:bg-cyan-300/10',
    danger: 'border border-red-300/30 bg-alertRed text-white shadow-lg shadow-red-500/20',
  };

  return (
    <button
      className={`rounded-2xl px-5 py-3 font-black tracking-tight transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
