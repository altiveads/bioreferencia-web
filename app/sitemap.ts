import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { allPaths } from '@/lib/routes';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (l: string, p: string) => `${SITE.url}${l}${p ? '/' + p : ''}/`;
  return allPaths().map((p) => ({ url: u('', p), alternates: { languages: { es: u('', p), en: u('/en', p) } } }));
}
