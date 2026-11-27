import { allPaths, meta, render } from '@/lib/routes';
export const dynamicParams = false;
export function generateStaticParams() { return allPaths().map((p) => ({ slug: p ? p.split('/') : [] })); }
export function generateMetadata({ params }: { params: { slug?: string[] } }) { return meta('es', (params.slug || []).join('/')); }
export default function Page({ params }: { params: { slug?: string[] } }) { return render('es', (params.slug || []).join('/')); }
