import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Lock, Radar, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RadarSweep } from '../components/radar/RadarSweep';

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-midnight text-white">
      <section className="mx-auto flex max-w-md flex-col px-5 pb-10 pt-8">
        <nav className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-cyberGold">Al-Muraqib</p>
            <p className="text-sm text-slate-400">Social Radar</p>
          </div>
          <Link to="/pricing" className="text-sm font-bold text-cyberGold">Pricing</Link>
        </nav>

        <Card className="relative mb-6 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.18),transparent_52%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-cyberGold">
              GCC-first opt-in intelligence
            </p>
            <h1 className="text-4xl font-black tracking-tight">Turn every social link into a live radar.</h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Post your private radar link on Snap, Instagram, WhatsApp, or Telegram. See who enters your social orbit using consented signals only.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/create-link" className="flex-1">
                <Button className="w-full">Create Radar</Button>
              </Link>
              <Link to="/dashboard" className="flex-1">
                <Button variant="ghost" className="w-full">Demo</Button>
              </Link>
            </div>
          </div>
        </Card>

        <RadarSweep />

        <section className="mt-8 grid gap-3">
          {[
            { icon: Radar, title: 'Signal Capture', body: 'Handle, platform, timing, timezone, and basic device metadata after consent.' },
            { icon: Eye, title: 'Trust Graph', body: 'See repeat observers, fast reactors, known contacts, and unknown signals.' },
            { icon: Lock, title: 'Paid Reveals', body: 'Stripe payment links for quick signals, full reports, and radar boosts.' },
            { icon: Shield, title: 'Legal-first', body: 'No official IG/Snap APIs. No covert tracking. No fake private-list claims.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="flex gap-4 rounded-3xl p-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-cyberGold" />
                <div>
                  <h2 className="font-black">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{item.body}</p>
                </div>
              </Card>
            );
          })}
        </section>

        <Link to="/r/demo" className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-cyberGold">
          Try public vibe check <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
