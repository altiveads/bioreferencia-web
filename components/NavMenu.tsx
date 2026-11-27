'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { NavGroup, NavItem } from '@/lib/nav';

type Group = Extract<NavGroup, { kind: string }>;
const order = ['servicios', 'pacientes', 'nosotros'];

function Row({ it, i, act, on }: { it: NavItem; i: number; act?: boolean; on?: () => void }) {
  const inner = (<><b>{it.label}</b><small>{it.desc}</small></>);
  const cls = `mi${act ? ' act' : ''}`; const st = { ['--i' as any]: i } as React.CSSProperties;
  return it.ext
    ? <a className={cls} style={st} href={it.href} target="_blank" rel="noopener" onMouseEnter={on} onFocus={on} data-track={it.href.includes('pago') ? 'pay_click' : 'results_click'} data-place="nav">{inner}</a>
    : <Link className={cls} style={st} href={it.href} onMouseEnter={on} onFocus={on}>{inner}</Link>;
}

export function NavMenu({ groups, active }: { groups: NavGroup[]; active: string }) {
  const [cur, setCur] = useState<string | null>(null);
  const [hiKey, setHiKey] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null), megaRef = useRef<HTMLDivElement>(null), hiRef = useRef<HTMLSpanElement>(null);
  const btns = useRef<Record<string, HTMLElement | null>>({}), panes = useRef<Record<string, HTMLElement | null>>({});
  const t = useRef<any>(null); const first = useRef(true); const [open, setOpen] = useState(false);

  const moveHi = (key: string | null) => {
    const h = hiRef.current; if (!h) return; const el = key && btns.current[key];
    if (!el) { h.style.opacity = '0'; return; }
    h.style.opacity = '1'; h.style.width = el.offsetWidth + 'px'; h.style.transform = `translateX(${el.offsetLeft}px)`;
  };
  const place = (key: string) => {
    const b = btns.current[key], p = panes.current[key], m = megaRef.current; if (!b || !p || !m) return;
    const w = p.offsetWidth, h = p.offsetHeight, r = b.getBoundingClientRect();
    let l = r.left + r.width / 2 - w / 2; l = Math.max(16, Math.min(l, window.innerWidth - w - 16));
    m.style.left = l + 'px'; m.style.width = w + 'px'; m.style.height = h + 'px';
  };
  const show = (key: string, focus = false) => {
    if (window.innerWidth < 1100) return; clearTimeout(t.current);
    megaRef.current?.classList.toggle('nomove', !open);
    setCur(key); setOpen(true); moveHi(key);
    requestAnimationFrame(() => { place(key); if (focus) panes.current[key]?.querySelector<HTMLElement>('a,button')?.focus(); });
  };
  const hide = (delay = 0) => { clearTimeout(t.current); t.current = setTimeout(() => { setOpen(false); setCur(null); moveHi(null); }, delay); };

  useEffect(() => { if (cur) place(cur); }, [cur]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape' && cur) { const b = btns.current[cur]; hide(); b?.focus(); } };
    const click = (e: MouseEvent) => { const n = e.target as HTMLElement; if (cur && !n.closest('#mega') && !n.closest('[data-nav]')) hide(); };
    const rs = () => { if (cur) { place(cur); moveHi(cur); } };
    document.addEventListener('keydown', esc); document.addEventListener('click', click); window.addEventListener('resize', rs);
    return () => { document.removeEventListener('keydown', esc); document.removeEventListener('click', click); window.removeEventListener('resize', rs); };
  });
  useEffect(() => { first.current = false; }, []);

  return (
    <>
      <nav ref={navRef} aria-label="Principal" data-nav className="relative hidden xl:flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white/[0.06]" onMouseLeave={() => { hide(160); }}>
        <span ref={hiRef} aria-hidden className="nav-hi" />
        {groups.map((g) => 'kind' in g ? (
          <button key={g.key} ref={(el) => { btns.current[g.key] = el; }} type="button" aria-expanded={cur === g.key} aria-controls="mega" data-nav
            className="ni" onMouseEnter={() => show(g.key)} onClick={() => (cur === g.key ? hide() : show(g.key, true))}
            onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); show(g.key, true); } }}>
            {g.label}<i className="car" aria-hidden />
          </button>
        ) : (
          <Link key={g.key} ref={(el: any) => { btns.current[g.key] = el; }} href={g.href} aria-current={active === g.key ? 'page' : undefined}
            className={`ni${active === g.key ? ' cur' : ''}`} onMouseEnter={() => { clearTimeout(t.current); t.current = setTimeout(() => { setOpen(false); setCur(null); }, 80); moveHi(g.key); }}
            onMouseLeave={() => moveHi(cur)}>{g.label}</Link>
        ))}
      </nav>

      <div id="mega" ref={megaRef} role="region" aria-label="Submenú" className={`mega${open ? ' open' : ''}`} onMouseEnter={() => clearTimeout(t.current)} onMouseLeave={() => hide(160)}>
        {groups.filter((g): g is Group => 'kind' in g).map((g) => (
          <section key={g.key} ref={(el) => { panes.current[g.key] = el; }} className={`pane${cur === g.key ? ' on' : ''}${cur && cur !== g.key && order.indexOf(g.key) < order.indexOf(cur) ? ' before' : ''}`}
            style={{ width: g.kind === 'servicios' ? 660 : g.kind === 'pacientes' ? 700 : 400 }} aria-hidden={cur !== g.key}>
            {g.kind === 'servicios' && (
              <div className="stg">
                <div className="eyebrow">{g.eyebrow}</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {g.items.map((it, i) => <Row key={it.href} it={it} i={i + 1} />)}
                </div>
              </div>
            )}
            {g.kind === 'pacientes' && (
              <>
                <div className="stg grid grid-cols-2 gap-3.5">
                  {g.items.slice(0, 2).map((it, i) => (
                    <a key={it.href} href={it.href} target="_blank" rel="noopener" style={{ ['--i' as any]: i } as React.CSSProperties} data-track={i ? 'pay_click' : 'results_click'} data-place="nav"
                      className={`big ${i ? 'pay' : 'res2'}`}><div><b>{it.label}</b><small>{it.desc}</small></div><span className="ar">{i ? '→' : '→'}</span></a>
                  ))}
                </div>
                <div className="stg mt-3.5 grid grid-cols-3 gap-1">{g.items.slice(2).map((it, i) => <Row key={it.href} it={it} i={i + 2} />)}</div>
              </>
            )}
            {g.kind === 'nosotros' && <div className="stg">{g.items.map((it, i) => <Row key={it.href} it={it} i={i} />)}</div>}
          </section>
        ))}
      </div>
    </>
  );
}
