'use client';
import { useState } from 'react';
import Link from 'next/link';
import { I } from './Icon';

export function MobileMenu({ items, menu, close, call, tel }: { items: { href: string; label: string; active: boolean }[]; menu: string; close: string; call: string; tel: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="xl:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-panel" aria-label={open ? close : menu} onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
        {open ? <I.X size={20} aria-hidden /> : <I.Menu size={20} aria-hidden />}
      </button>
      {open && (
        <div id="mobile-panel" className="absolute left-0 top-20 w-full border-b border-white/10 backdrop-blur-xl px-5 py-4" style={{ background: 'var(--hdr)' }}>
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            {items.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={n.active ? 'page' : undefined}
                className={`rounded-xl px-4 py-3 text-lg ${n.active ? 'bg-white/15 font-medium' : 'hover:bg-white/10'}`}>{n.label}</Link>
            ))}
            <a href={`tel:${tel}`} className="mt-2 rounded-xl px-4 py-3 text-lg inline-flex items-center gap-2 bg-white/10"><I.Phone size={18} aria-hidden /> {call}</a>
          </nav>
        </div>
      )}
    </div>
  );
}
