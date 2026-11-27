import Link from 'next/link';
import { SITE, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';
import { SEDES, PROCESSING } from '@/lib/data';
import { navModel } from '@/lib/nav';
import { Social } from './Social';

export function Footer({ lang }: { lang: Lang }) {
  const t = T(lang); const p = lang === 'en' ? '/en' : '';
  const m = navModel(lang);
  const flat = (k: string) => { const g: any = m.find((x) => x.key === k); return (g?.items || []) as { label: string; href: string; ext?: boolean }[]; };
  const groups = [
    { title: lang === 'es' ? 'Servicios' : 'Services', items: [{ label: t.nav.exams, href: `${p}/examenes/` }, { label: lang === 'es' ? 'A domicilio' : 'At home', href: `${p}/a-domicilio/` }, ...flat('servicios')] },
    { title: lang === 'es' ? 'Pacientes' : 'Patients', items: [...flat('pacientes'), { label: 'Blog', href: `${p}/blog/` }] },
    { title: lang === 'es' ? 'Nosotros' : 'About', items: flat('nosotros') },
  ];
  return (
    <footer className="mt-24 border-t border-outline-variant/40 bg-surface-low pb-28 md:pb-0">
      <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_blanco.webp" alt="BioReferencia" width={209} height={36} className="h-9 w-auto hidden [[data-theme=dark]_&]:block" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/brand/logo_horizontal_color.webp" alt="BioReferencia" width={209} height={36} loading="lazy" className="h-9 w-auto hidden [[data-theme=light]_&]:block" />
          <p className="mt-4 text-on-variant text-sm">{t.footer.tag}</p>
          <p className="mt-3 text-on-variant text-sm">{t.footer.cert}</p>
          <Social className="mt-5" />
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="font-medium mb-3">{g.title}</h2>
            <ul className="space-y-2 text-sm text-on-variant">
              {g.items.map((n) => <li key={n.href}>{n.ext ? <a href={n.href} target="_blank" rel="noopener" className="hover:text-primary">{n.label}</a> : <Link href={n.href} className="hover:text-primary">{n.label}</Link>}</li>)}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-medium mb-3">{t.nav.sites}</h2>
          <ul className="space-y-2 text-sm text-on-variant">
            {SEDES.map((s) => <li key={s.slug}><Link href={`${p}/sedes/${s.slug}/`} className="hover:text-primary">{s.name}</Link></li>)}
            <li>Pereira · {lang === 'es' ? 'próximamente' : 'coming soon'}</li>
          </ul>
          <p className="mt-3 text-xs text-on-variant">{PROCESSING[lang]}</p>
          <h2 className="font-medium mt-6 mb-3">{t.footer.contact}</h2>
          <ul className="space-y-2 text-sm text-on-variant">
            <li><a href={`tel:${SITE.tel}`} className="hover:text-primary">{SITE.telDisplay}</a></li>
            <li><a href={`https://wa.me/${SITE.wa}`} className="hover:text-primary" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-outline-variant/40 py-5 text-xs text-on-variant">
        <Link href={`${p}/politicas/`} className="hover:text-primary">{lang === 'es' ? 'Políticas' : 'Policies'}</Link>
        <a href="/docs/politicas/proteccion-de-datos-personales.pdf" target="_blank" rel="noopener" className="hover:text-primary">{lang === 'es' ? 'Tratamiento de datos personales' : 'Personal data policy'}</a>
        <Link href={`${p}/pqrsf/`} className="hover:text-primary">PQRSF</Link>
        <Link href={`${p}/trabaja-con-nosotros/`} className="hover:text-primary">{lang === 'es' ? 'Trabaja con nosotros' : 'Work with us'}</Link>
      </div>
      <div className="border-t border-outline-variant/40 py-5 text-center text-xs text-on-variant">© {new Date().getFullYear()} BioReferencia. {t.footer.rights}</div>
    </footer>
  );
}
