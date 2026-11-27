'use client';
import { useEffect, useRef, useState } from 'react';

export function ScrollStory({ title, sub, items, cta, note }: { title: string; sub: string; items: string[][]; cta: React.ReactNode; note: string }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));
  const [ready, setReady] = useState(false);
  const list = useRef<HTMLOListElement>(null), bar = useRef<HTMLSpanElement>(null), bar2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setReady(true);
    const els = Array.from(list.current?.querySelectorAll<HTMLElement>('[data-i]') || []);
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        const i = Number((e.target as HTMLElement).dataset.i);
        if (e.isIntersecting) setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    const mid = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-45% 0px -45% 0px' });
    els.forEach((el) => { io.observe(el); mid.observe(el); });
    let raf = 0;
    const tick = () => {
      raf = 0; const l = list.current; if (!l) return;
      const r = l.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (innerHeight * 0.5 - r.top) / r.height));
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      if (bar2.current) bar2.current.style.transform = `scaleX(${p})`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { io.disconnect(); mid.disconnect(); removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  const n = (i: number) => String(i + 1).padStart(2, '0');
  return (
    <section className="story container-x py-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="h1">{title}</h1>
          <p className="lead mt-4">{sub}</p>
          <div className="mt-8 hidden lg:block" aria-hidden>
            <div className="flex items-baseline gap-2"><span className="text-5xl font-semibold tabular-nums text-primary">{n(active)}</span><span className="text-on-variant">/ {n(items.length - 1)}</span></div>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-high"><span ref={bar2} className="block h-full origin-left rounded-full bg-primary" style={{ transform: 'scaleX(0)' }} /></div>
          </div>
          <div className="mt-8 hidden lg:block">{cta}</div>
        </div>

        <div className="relative pl-8 lg:pl-0">
          <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-outline-variant/50 lg:hidden"><span ref={bar} className="block h-full w-px origin-top bg-primary" style={{ transform: 'scaleY(0)' }} /></span>
          <ol ref={list} className="space-y-6 lg:space-y-0">
            {items.map(([a, b], i) => (
              <li key={a} data-i={i} className={`story-item${ready ? ' on' : ''}${seen.has(i) || !ready ? ' seen' : ''}${active === i ? ' active' : ''}`}>
                <span className="story-n" aria-hidden>{n(i)}</span>
                <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{a}</h2>
                <p className="mt-3 max-w-xl text-lg font-light text-on-variant">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-on-variant">* {note}</p>
          <div className="mt-8 lg:hidden">{cta}</div>
        </div>
      </div>
    </section>
  );
}
