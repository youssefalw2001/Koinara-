import { useEffect, useMemo, useState } from 'react';
import { LockKeyhole, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

const chars = '01#@$%؟خسمرقبABCDEFGHIJKLMNOPQRSTUVWXYZ';

function scramble(length: number) {
  return Array.from({ length })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
}

type Props = {
  lockedLabel?: string;
  revealedText?: string;
};

export function DecryptionReveal({
  lockedLabel = 'Identity Hint Locked',
  revealedText = 'Possible known contact. Suffix may end in -82.',
}: Props) {
  const [paid, setPaid] = useState(false);
  const [decrypting, setDecrypting] = useState(false);
  const [display, setDisplay] = useState(lockedLabel);

  const targetLength = useMemo(
    () => Math.max(revealedText.length, lockedLabel.length),
    [revealedText, lockedLabel],
  );

  useEffect(() => {
    if (!decrypting) return;

    let ticks = 0;
    const id = window.setInterval(() => {
      ticks += 1;
      if (ticks < 12) setDisplay(scramble(targetLength));
      else {
        setDisplay(revealedText);
        setDecrypting(false);
      }
    }, 90);

    return () => window.clearInterval(id);
  }, [decrypting, revealedText, targetLength]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-400/10">
          {paid ? <Sparkles className="h-5 w-5 text-cyberGold" /> : <LockKeyhole className="h-5 w-5 text-cyberGold" />}
        </div>
        <div>
          <h3 className="font-black text-white">Deciphering Identity</h3>
          <p className="text-sm text-slate-400">Consent-gated reveal simulation.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-black/40 p-4 font-mono text-sm">
        <p className={decrypting ? 'animate-decrypt break-words text-cyberGold' : 'break-words text-slate-200'}>
          {decrypting ? 'DECIPHERING: ' : ''}
          {display}
        </p>
      </div>
      <Button className="mt-4 w-full" onClick={() => { setPaid(true); setDecrypting(true); }}>
        Reveal Hint - $1.99
      </Button>
    </div>
  );
}
