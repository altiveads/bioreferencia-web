import Link from 'next/link';
import { I } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { NavMenu } from './NavMenu';
import { navModel } from '@/lib/nav';
import { SITE, waLink, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';

export function Header({ lang, path }: { lang: Lang; path: string }) {
  const t = T(lang); const groups = navModel(lang); const top = path.split('/')[0];
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
        <NavMenu groups={groups} active={top} />
        <div className="flex items-center gap-2">
          <ThemeToggle labelToLight={t.theme_dark} labelToDark={t.theme_light} />
          <Link href={alt} hrefLang={lang === 'es' ? 'en' : 'es'} aria-label={t.lang_label} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white/10 px-3 text-sm font-medium hover:bg-white/20 transition-colors">
            <I.Languages size={16} aria-hidden /> {t.lang_short}
          </Link>
          <a href={SITE.pay} target="_blank" rel="noopener" data-track="pay_click" data-place="header" className="hidden md:inline-flex items-center h-10 rounded-full bg-white/10 px-4 text-sm font-medium hover:bg-white/20 transition-colors">{lang === 'es' ? 'Pagar' : 'Pay'}</a>
          <a href={waLink(lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.')} target="_blank" rel="noopener" data-track="whatsapp_click" data-place="header"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 2xl:px-5 h-10 font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}>
            <I.MessageCircle size={18} aria-hidden /> {t.wa_short}
          </a>
          <MobileMenu groups={groups} menu={t.menu} close={t.close} call={`${t.call_short} ${SITE.telDisplay}`} tel={SITE.tel} wa={waLink(lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.')} waLabel={t.wa_short} placeholder={lang === 'es' ? 'Busca un examen…' : 'Search a test…'} pay={lang === 'es' ? 'Pagar en línea' : 'Pay online'} lang={lang} />
        </div>
      </div>
    </header>
  );
}
