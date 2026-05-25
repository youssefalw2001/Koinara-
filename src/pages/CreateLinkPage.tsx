import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Link2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { createRadarLink, normalizeSlug } from '../lib/radar';

export function CreateLinkPage() {
  const [title, setTitle] = useState('Do you pass my vibe check?');
  const [slug, setSlug] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const safeSlug = normalizeSlug(slug) || `radar-${Math.random().toString(36).slice(2, 8)}`;
    await createRadarLink({ title, slug: safeSlug });
    const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin;
    setGeneratedUrl(`${baseUrl}/r/${safeSlug}`);
    setLoading(false);
  }

  async function copyLink() {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
  }

  return (
    <main className="min-h-screen bg-midnight px-5 py-8 text-white">
      <div className="mx-auto max-w-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-cyberGold">Create Link</p>
        <h1 className="mt-2 text-3xl font-black">Launch your radar.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Create a link, post it anywhere, and let people opt into your social radar.</p>

        <form onSubmit={submit} className="mt-6">
          <Card>
            <label className="mb-2 block text-sm font-semibold text-slate-200">Vibe prompt</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:ring-4 focus:ring-yellow-400/30" />

            <label className="mb-2 block text-sm font-semibold text-slate-200">Custom slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="adam-radar" className="mb-5 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-yellow-400/30" />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Generate Radar Link'}
            </Button>
          </Card>
        </form>

        {generatedUrl && (
          <Card className="mt-5 border-yellow-400/20">
            <div className="mb-3 flex items-center gap-2 text-cyberGold">
              <Link2 className="h-5 w-5" />
              <h2 className="font-black">Your link is ready</h2>
            </div>
            <p className="break-all rounded-2xl bg-slate-900 p-3 text-sm text-slate-200">{generatedUrl}</p>
            <Button onClick={copyLink} className="mt-4 w-full">
              <Copy className="mr-2 inline h-4 w-4" /> Copy Link
            </Button>
          </Card>
        )}

        <Link to="/dashboard" className="mt-6 block text-center text-sm font-bold text-cyberGold">View demo dashboard</Link>
      </div>
    </main>
  );
}
