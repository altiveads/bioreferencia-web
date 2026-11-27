'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { I } from './Icon';
import { SITE } from '@/lib/site';
import type { NavGroup } from '@/lib/nav';

export function MobileMenu({ groups, menu, close, call, tel, wa, waLabel, placeholder, pay, lang }: { groups: NavGroup[]; menu: string; close: string; call: string; tel: string; wa: string; waLabel: string; placeholder: string; pay: string; lang: string }) {
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [open]);
  const go = () => setOpen(false);
  const p = lang === 'en' ? '/en' : '';
  return (
    <div className="xl:hidden">
      <button type="button" aria-expanded={open} aria-controls="mobile-panel" aria-label={menu} onClick={() => setOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
        <I.Menu size={20} aria-hidden />
      </button>
      {mounted && createPortal(
      <div id="mobile-panel" role="dialog" aria-modal="true" aria-label={menu} aria-hidden={!open} className={`sheet${open ? ' open' : ''}`}>
        <div className="flex h-20 flex-none items-center justify-end border-b border-outline-variant/50 px-5">
          <button type="button" onClick={go} aria-label={close} className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-medium hover:bg-white/20"><I.X size={18} aria-hidden /> {close}</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
          <Link href={`${p}/examenes/`} onClick={go} className="mb-2 flex h-14 items-center gap-3 rounded-2xl border border-outline-variant bg-background/60 px-4 text-[17px] text-on-variant">
            <I.Search size={18} className="text-primary" aria-hidden /> {placeholder}
          </Link>
          {groups.map((g) => 'kind' in g ? (
            <div key={g.key} className={`acc${acc === g.key ? ' o' : ''}`}>
              <button type="button" aria-expanded={acc === g.key} onClick={() => setAcc(acc === g.key ? null : g.key)}>{g.label}<i className="car" aria-hidden /></button>
              <div className="ab"><div>
                {g.items.map((it) => it.ext
                  ? <a key={it.href} href={it.href} target="_blank" rel="noopener" onClick={go} className="mi"><b style={{ fontSize: 16 }}>{it.label}</b><small>{it.desc}</small></a>
                  : <Link key={it.href} href={it.href} onClick={go} className="mi"><b style={{ fontSize: 16 }}>{it.label}</b><small>{it.desc}</small></Link>)}
                <div className="h-3" />
              </div></div>
            </div>
          ) : (
            <div key={g.key} className="acc"><Link href={g.href} onClick={go}>{g.label}</Link></div>
          ))}
          <a href={`tel:${tel}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-base"><I.Phone size={18} aria-hidden /> {call}</a>
        </div>
        <div className="flex flex-none gap-3 border-t border-outline-variant/50 px-6 pb-6 pt-4">
          <a href={SITE.pay} target="_blank" rel="noopener" data-track="pay_click" data-place="mobile_menu" className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-white/10 font-medium">{pay}</a>
          <a href={wa} target="_blank" rel="noopener" data-track="whatsapp_click" data-place="mobile_menu" className="inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}><I.MessageCircle size={18} aria-hidden /> {waLabel}</a>
        </div>
      </div>
      , document.body)}
    </div>
  );
}
