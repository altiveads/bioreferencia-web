import Link from 'next/link';
import { SITE, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';
import { SEDES, PROCESSING } from '@/lib/data';
import { NAV } from './Header';

export function Footer({ lang }: { lang: Lang }) {
  const t = T(lang); const p = lang === 'en' ? '/en' : '';
  return (
    <footer className="mt-24 border-t border-outline-variant/40 bg-surface-low pb-28 md:pb-0">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_blanco.webp" alt="BioReferencia" width={209} height={36} className="h-9 w-auto hidden [[data-theme=dark]_&]:block" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_color.webp" alt="BioReferencia" width={209} height={36} loading="lazy" className="h-9 w-auto hidden [[data-theme=light]_&]:block" />
          <p className="mt-4 text-on-variant text-sm">{t.footer.tag}</p>
          <p className="mt-3 text-on-variant text-sm">{t.footer.cert}</p>
        </div>
        <div>
          <h2 className="font-medium mb-3">{t.footer.pages}</h2>
          <ul className="space-y-2 text-sm text-on-variant">
            {NAV(lang).map((n) => <li key={n.key}><Link href={n.href} className="hover:text-primary">{n.label}</Link></li>)}
            <li><Link href={`${p}/preguntas-frecuentes/`} className="hover:text-primary">{T(lang).faq.h1}</Link></li>
            <li><Link href={`${p}/blog/`} className="hover:text-primary">Blog</Link></li>
            <li><Link href={`${p}/usuario-elite/`} className="hover:text-primary">{lang === 'es' ? 'Usuario Élite' : 'Elite User'}</Link></li>
            <li><Link href={`${p}/chequeos-ejecutivos/`} className="hover:text-primary">{lang === 'es' ? 'Chequeos' : 'Check-ups'}</Link></li>
            <li><Link href={`${p}/quienes-somos/`} className="hover:text-primary">{lang === 'es' ? 'Quiénes somos' : 'About us'}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-medium mb-3">{t.nav.sites}</h2>
          <ul className="space-y-2 text-sm text-on-variant">
            {SEDES.map((s) => <li key={s.slug}><Link href={`${p}/sedes/${s.slug}/`} className="hover:text-primary">{s.name}</Link></li>)}
          </ul>
          <p className="mt-3 text-xs text-on-variant">{PROCESSING[lang]}</p>
        </div>
        <div>
          <h2 className="font-medium mb-3">{t.footer.contact}</h2>
          <ul className="space-y-2 text-sm text-on-variant">
            <li><a href={`tel:${SITE.tel}`} className="hover:text-primary">{SITE.telDisplay}</a></li>
            <li><a href={`https://wa.me/${SITE.wa}`} className="hover:text-primary" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
          <h2 className="font-medium mt-6 mb-3">{t.footer.follow}</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-on-variant">
            {Object.entries(SITE.social).map(([k, u]) => <li key={k}><a href={u} target="_blank" rel="noopener me" className="hover:text-primary capitalize">{k}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant/40 py-5 text-center text-xs text-on-variant">© {new Date().getFullYear()} BioReferencia. {t.footer.rights}</div>
    </footer>
  );
}
