import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const plans = [
  {
    name: 'Quick Signal',
    price: '$1.99',
    body: 'Unlock one consent-based identity hint and activity summary.',
    env: 'VITE_STRIPE_LINK_QUICK_SIGNAL',
  },
  {
    name: 'Full Radar Report',
    price: '$4.99',
    body: 'See timing, repeat visits, trust graph position, and consented metadata.',
    env: 'VITE_STRIPE_LINK_FULL_REPORT',
  },
  {
    name: '24h Radar Boost',
    price: '$9.99',
    body: 'Unlimited report unlocks for one radar link during a launch window.',
    env: 'VITE_STRIPE_LINK_RADAR_BOOST',
  },
];

export function PricingPage() {
  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-cyberGold">Unlocks</p>
        <h1 className="mt-2 text-3xl font-black">Monetization ladder</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Use Stripe Payment Links first. Add webhooks after validation.</p>

        <section className="mt-6 space-y-4">
          {plans.map((plan) => {
            const href = (import.meta.env[plan.env] as string | undefined) || '#';
            return (
              <Card key={plan.name} className="border-yellow-400/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black">{plan.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{plan.body}</p>
                  </div>
                  <p className="text-xl font-black text-cyberGold">{plan.price}</p>
                </div>
                <a href={href} target="_blank" rel="noreferrer">
                  <Button className="mt-5 w-full">Unlock</Button>
                </a>
              </Card>
            );
          })}
        </section>

        <Link to="/" className="mt-6 block text-center text-sm font-bold text-cyberGold">Back home</Link>
      </div>
    </main>
  );
}
