import Link from 'next/link';
import { I } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { SITE, waLink, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';

export const NAV = (lang: Lang) => {
  const t = T(lang).nav; const p = lang === 'en' ? '/en' : '';
  return [
    { href: `${p}/`, label: t.home, key: '' }, { href: `${p}/examenes/`, label: t.exams, key: 'examenes' }, { href: `${p}/a-domicilio/`, label: t.home_service, key: 'a-domicilio' },
    { href: `${p}/convenios/`, label: t.insurers, key: 'convenios' }, { href: `${p}/sedes/`, label: t.sites, key: 'sedes' },
    { href: `${p}/laboratorio-de-referencia/`, label: t.reference, key: 'laboratorio-de-referencia' }, { href: `${p}/resultados/`, label: t.results, key: 'resultados' },
  ];
};

export function Header({ lang, path }: { lang: Lang; path: string }) {
  const t = T(lang); const nav = NAV(lang); const top = path.split('/')[0];
  const alt = lang === 'es' ? `/en${path ? '/' + path : ''}/` : `${path ? '/' + path : ''}/`;
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-xl" style={{ background: 'var(--hdr)' }}>
      <div className="h-20 container-x !max-w-[90rem] flex items-center justify-between gap-3">
        <Link href={lang === 'en' ? '/en/' : '/'} aria-label="BioReferencia" className="flex-shrink-0 inline-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_blanco.webp" alt="BioReferencia" width={209} height={36} className="h-9 w-auto hidden [[data-theme=dark]_&]:block" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_color.webp" alt="BioReferencia" width={209} height={36} loading="lazy" className="h-9 w-auto hidden [[data-theme=light]_&]:block" />
        </Link>
        <nav aria-label="Principal" className="hidden xl:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.06]">
          {nav.map((n) => (
            <Link key={n.key} href={n.href} aria-current={top === n.key ? 'page' : undefined}
              className={`px-2.5 2xl:px-3.5 py-2 rounded-full text-[14px] 2xl:text-[15px] whitespace-nowrap transition-colors ${top === n.key ? 'bg-white/15 text-on-surface font-medium' : 'text-on-variant hover:text-on-surface hover:bg-white/10'}`}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle labelToLight={t.theme_dark} labelToDark={t.theme_light} />
          <Link href={alt} hrefLang={lang === 'es' ? 'en' : 'es'} aria-label={t.lang_label} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/10 px-3 text-sm font-medium hover:bg-white/20 transition-colors">
            <I.Languages size={16} aria-hidden /> {t.lang_short}
          </Link>
          <a href={waLink(lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.')} target="_blank" rel="noopener" data-track="whatsapp_click" data-place="header"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 2xl:px-5 h-10 font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}>
            <I.MessageCircle size={18} aria-hidden /> {t.wa_short}
          </a>
          <MobileMenu items={nav.map((n) => ({ href: n.href, label: n.label, active: top === n.key }))} menu={t.menu} close={t.close} call={`${t.call_short} ${SITE.telDisplay}`} tel={SITE.tel} />
        </div>
      </div>
    </header>
  );
}
