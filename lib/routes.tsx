import type { Metadata } from 'next';
import { SITE, type Lang } from './site';
import { T } from './i18n';
import { SEDES } from './data';
import { allExams, examBySlug } from './exams';
import { Shell } from '@/components/Shell';
import { Home, ExamsHub, ExamPage, Domicilio, Convenios, SedesIndex, SedePage, Reference, Results, FaqPage, About, NotFound, BlogIndex, BlogPost, Elite, Chequeos } from './pages';
import { posts, postBySlug } from './blog';

const STATIC = ['', 'examenes', 'a-domicilio', 'convenios', 'sedes', 'laboratorio-de-referencia', 'resultados', 'preguntas-frecuentes', 'quienes-somos', 'blog', 'usuario-elite', 'chequeos-ejecutivos'];

export function allPaths(): string[] {
  return [...STATIC, ...SEDES.map((s) => `sedes/${s.slug}`), ...allExams().map((e) => `examenes/${e.slug}`), ...posts().map((x) => `blog/${x.slug}`)];
}
const stickyMsg = (l: Lang, p: string) => {
  if (p.startsWith('examenes/')) { const e = examBySlug(p.slice(9)); if (e) return T(l).exams.book_msg(e.name); }
  if (p === 'a-domicilio') return T(l).dom.msg;
  return l === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.';
};

export function meta(lang: Lang, path: string): Metadata {
  const t = T(lang); let title = t.home.title, description = t.home.desc;
  const [a, b] = path.split('/');
  if (path === '') { /* home */ }
  else if (path === 'examenes') ({ title, desc: description } = t.exams as any);
  else if (a === 'examenes' && b) { const e = examBySlug(b)!; title = `${e.name}: ${lang === 'es' ? 'preparación, muestra y entrega' : 'preparation, sample and delivery'} | BioReferencia`;
    description = (e.description || e.purpose || `${e.name}. ${e.sample || e.container || ''} ${e.prep || e.delivery || ''}`).replace(/\s+/g, ' ').slice(0, 155); }
  else if (path === 'a-domicilio') ({ title, desc: description } = t.dom as any);
  else if (path === 'convenios') ({ title, desc: description } = t.conv as any);
  else if (path === 'sedes') ({ title, desc: description } = t.sedes as any);
  else if (a === 'sedes' && b) { const s = SEDES.find((x) => x.slug === b)!; title = t.sedes.t(s.name, s.city); description = t.sedes.d(s.name, s.addr); }
  else if (path === 'laboratorio-de-referencia') ({ title, desc: description } = t.ref as any);
  else if (path === 'resultados') ({ title, desc: description } = t.res as any);
  else if (path === 'preguntas-frecuentes') ({ title, desc: description } = t.faq as any);
  else if (path === 'quienes-somos') ({ title, desc: description } = t.about as any);
  else if (path === 'blog') ({ title, desc: description } = t.blog as any);
  else if (a === 'blog' && b) { const x = postBySlug(b)!; title = `${x.title} | BioReferencia`; description = x.desc; }
  else if (path === 'usuario-elite') ({ title, desc: description } = t.elite as any);
  else if (path === 'chequeos-ejecutivos') ({ title, desc: description } = t.chk as any);
  const loc = (l: Lang) => `${SITE.url}${l === 'en' ? '/en' : ''}${path ? '/' + path : ''}/`;
  return {
    metadataBase: new URL(SITE.url), title, description,
    alternates: { canonical: loc(lang), languages: { es: loc('es'), en: loc('en'), 'x-default': loc('es') } },
    openGraph: { title, description, url: loc(lang), siteName: 'BioReferencia', locale: lang === 'es' ? 'es_CO' : 'en_US', type: a === 'blog' && b ? 'article' : 'website', images: [{ url: SITE.url + ((a === 'blog' && b && postBySlug(b)?.img) || '/img/sedes/envigado.webp') }] },
    robots: SITE.preview ? { index: false, follow: false } : { index: true, follow: true },
    icons: { icon: '/icon.png', apple: '/icon.png' },
  };
}

export function render(lang: Lang, path: string) {
  const [a, b] = path.split('/');
  let body: React.ReactNode;
  if (path === '') body = <Home lang={lang} />;
  else if (path === 'examenes') body = <ExamsHub lang={lang} />;
  else if (a === 'examenes' && b) body = <ExamPage lang={lang} exam={examBySlug(b)!} />;
  else if (path === 'a-domicilio') body = <Domicilio lang={lang} />;
  else if (path === 'convenios') body = <Convenios lang={lang} />;
  else if (path === 'sedes') body = <SedesIndex lang={lang} />;
  else if (a === 'sedes' && b) body = <SedePage lang={lang} sede={SEDES.find((s) => s.slug === b)!} />;
  else if (path === 'laboratorio-de-referencia') body = <Reference lang={lang} />;
  else if (path === 'resultados') body = <Results lang={lang} />;
  else if (path === 'preguntas-frecuentes') body = <FaqPage lang={lang} />;
  else if (path === 'quienes-somos') body = <About lang={lang} />;
  else if (path === 'blog') body = <BlogIndex lang={lang} />;
  else if (a === 'blog' && b) body = <BlogPost lang={lang} post={postBySlug(b)!} />;
  else if (path === 'usuario-elite') body = <Elite lang={lang} />;
  else if (path === 'chequeos-ejecutivos') body = <Chequeos lang={lang} />;
  else body = <NotFound lang={lang} />;
  return <Shell lang={lang} path={path} stickyMsg={stickyMsg(lang, path)}>{body}</Shell>;
}
