'use client';
import { useState } from 'react';
export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="rounded-full bg-surface-high px-5 py-3 font-medium text-primary break-all">{email}</a>
      <button type="button" className="btn-ghost !py-3" onClick={async () => { try { await navigator.clipboard.writeText(email); setOk(true); setTimeout(() => setOk(false), 2000); } catch {} }}>{ok ? copied : copy}</button>
    </div>
  );
}
