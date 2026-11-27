import { allPaths, meta, render } from '@/lib/routes';
export const dynamicParams = false;
export function generateStaticParams() { return allPaths().map((p) => ({ slug: p ? p.split('/') : [] })); }
export function generateMetadata({ params }: { params: { slug?: string[] } }) { return meta('en', (params.slug || []).join('/')); }
export default function Page({ params }: { params: { slug?: string[] } }) { return render('en', (params.slug || []).join('/')); }
