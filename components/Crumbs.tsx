import Link from 'next/link';
import { Json } from './Json';
import { SITE, type Lang } from '@/lib/site';
export function Crumbs({ lang, items }: { lang: Lang; items: { name: string; href: string }[] }) {
  const p = lang === 'en' ? '/en' : '';
  const all = [{ name: lang === 'es' ? 'Inicio' : 'Home', href: `${p}/` }, ...items.map((i) => ({ ...i, href: `${p}${i.href}` }))];
  return (
    <>
      <nav aria-label="breadcrumb" className="container-x pt-8 text-sm text-on-variant">
        <ol className="flex flex-wrap gap-2">
          {all.map((c, i) => (
            <li key={c.href} className="flex gap-2">{i > 0 && <span aria-hidden>/</span>}
              {i < all.length - 1 ? <Link href={c.href} className="hover:text-primary">{c.name}</Link> : <span aria-current="page" className="text-on-surface">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <Json data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.url + c.href })) }} />
    </>
  );
}
