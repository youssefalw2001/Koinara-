import { Link } from 'react-router-dom';
import { Crown, Gift, Shield, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { giftTypes, hasSupabaseConfig } from '../lib/supabase';
import { formatMoney } from '../lib/daira';

const futurePacks = [
  { name: 'Starter Coins', price: '$0.99', coins: '100', body: 'Enough for a Rose or small entry push.' },
  { name: 'Golden Pack', price: '$4.99', coins: '750', body: 'Best early pack for Golden and Diamond Entries.' },
  { name: 'Crown Pack', price: '$9.99', coins: '1,600', body: 'Challenge a Top 3 Crown Holder position.' },
  { name: 'Royal Pack', price: '$29.99', coins: '5,000', body: 'For supporters trying to dominate the Circle.' },
];

export function PricingPage() {
  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-md">
        <nav className="mb-6 flex items-center justify-between">
          <Link to="/" className="text-sm font-black text-cyberGold">Daira</Link>
          <Link to="/create" className="text-sm font-bold text-slate-300">Start Circle</Link>
        </nav>

        <Card className="relative mb-5 overflow-hidden border-yellow-400/20 bg-slate-950 shadow-radar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.12),transparent_44%)]" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyberGold">
              Gift economy
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight">Gifts move the leaderboard.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Supporters buy coin packs, send entries, and compete for Crown Holder status. Creators later earn a controlled 30% share after verification.
            </p>
          </div>
        </Card>

        {!hasSupabaseConfig && (
          <Card className="mb-5 border-yellow-400/20 bg-yellow-400/10 text-sm leading-6 text-yellow-100">
            Payments are not active until Stripe and Supabase are configured. The gift ladder is wired as product structure first.
          </Card>
        )}

        <Card className="mb-5 border-yellow-400/10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black"><Gift className="h-5 w-5 text-cyberGold" /> Entry gifts</h2>
          <div className="space-y-3">
            {giftTypes.map((gift) => (
              <div key={gift.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{gift.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{gift.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-cyberGold">{gift.points}</p>
                    <p className="text-xs text-slate-500">{formatMoney(gift.amountCents)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <section className="mb-5 space-y-4">
          {futurePacks.map((pack, index) => (
            <Card key={pack.name} className={`border-yellow-400/10 ${index === 1 ? 'bg-yellow-400/5' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black">{pack.name}</h2>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-cyberGold">{pack.coins} coins</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{pack.body}</p>
                </div>
                <p className="text-xl font-black text-cyberGold">{pack.price}</p>
              </div>
              <Button disabled className="mt-5 w-full opacity-60">Stripe coming next</Button>
            </Card>
          ))}
        </section>

        <Card className="mb-5 border-purple-400/10 bg-purple-400/5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black"><Crown className="h-5 w-5 text-purple-300" /> Top 3 unlocks</h2>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <p><b className="text-cyberGold">#1 Crown Holder:</b> pinned spot, highlighted message, and creator-set premium reward.</p>
            <p><b className="text-cyberGold">#2 Diamond Holder:</b> highlighted message and creator reaction.</p>
            <p><b className="text-cyberGold">#3 Golden Holder:</b> Top 3 badge and Circle Pulse mention.</p>
          </div>
        </Card>

        <Card className="flex gap-3 border-emerald-400/10 bg-emerald-400/5 text-sm leading-6 text-emerald-50">
          <Shield className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
          Rewards must stay inside Daira. No phone numbers, private Snap, adult content, meetups, or off-platform access.
        </Card>

        <Link to="/c/noura" className="mt-6 flex items-center justify-center gap-2 text-sm font-black text-cyberGold">
          Try supporter flow <Sparkles className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
