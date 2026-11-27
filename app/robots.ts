import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return SITE.preview ? { rules: { userAgent: '*', disallow: '/' } } : { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE.url}/sitemap.xml` };
}
