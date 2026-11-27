import Link from 'next/link';
import { I } from '@/components/Icon';
import { WaButton, CallButton, CtaBand } from '@/components/Cta';
import { Faq } from '@/components/Faq';
import { Json } from '@/components/Json';
import { Crumbs } from '@/components/Crumbs';
import { ExamSearch } from '@/components/ExamSearch';
import { ScrollStory } from '@/components/ScrollStory';
import { SITE, waLink, type Lang } from './site';
import { T } from './i18n';
import { SEDES, CONVENIOS, FAQS, DOM_STEPS, REF_STEPS, PROCESSING, SOON_SEDE, mapsUrl, type Sede } from './data';
import { allExams, examBySlug, type Exam } from './exams';
import { posts, type Post } from './blog';

const pre = (l: Lang) => (l === 'en' ? '/en' : '');
const faqItems = (l: Lang, n?: number) => FAQS.slice(0, n).map((f) => ({ q: f.q[l], a: f.a[l] }));
const faqLd = (l: Lang, n?: number) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems(l, n).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const labelsOf = (l: Lang) => { const e = T(l).exams; return { search: e.search, all: e.all, area: e.area, results: e.results, none: e.none, more: e.more }; };

export const orgLd = {
  '@context': 'https://schema.org', '@type': ['MedicalBusiness', 'DiagnosticLab'], '@id': `${SITE.url}/#org`, name: 'BioReferencia', url: SITE.url, logo: `${SITE.url}/img/brand/logo_horizontal_color.png`,
  telephone: SITE.tel, areaServed: ['Medellín', 'Envigado', 'Rionegro', 'Antioquia'], sameAs: Object.values(SITE.social),
  address: { '@type': 'PostalAddress', streetAddress: 'Cra. 48 #32B Sur-30, Clínica Nova, Piso 4', addressLocality: 'Envigado', addressRegion: 'Antioquia', addressCountry: 'CO' },
};
const sedeLd = (s: Sede, l: Lang) => {
  const [lat, lng] = s.coords.split(',').map(Number);
  const days: Record<string, string[]> = {};
  return { '@context': 'https://schema.org', '@type': 'MedicalClinic', '@id': `${SITE.url}/sedes/${s.slug}/#sede`, name: `BioReferencia ${s.name}`, parentOrganization: { '@id': `${SITE.url}/#org` }, url: `${SITE.url}${pre(l)}/sedes/${s.slug}/`,
    image: SITE.url + s.img, telephone: SITE.tel, address: { '@type': 'PostalAddress', streetAddress: s.addr, addressLocality: s.city, addressRegion: 'Antioquia', addressCountry: 'CO' },
    geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng }, openingHours: s.hours.es.join('; '), ...days };
};

/* ---------- HOME ---------- */
export function Home({ lang }: { lang: Lang }) {
  const t = T(lang); const h = t.home; const p = pre(lang);
  const msg = lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.';
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="blob-a absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
          <div className="blob-b absolute top-[40%] -left-32 h-[450px] w-[450px] rounded-full bg-tertiary/10 blur-[120px]" />
        </div>
        <div className="container-x hero-in relative flex flex-col items-center pt-16 pb-16 text-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-surface-high/80 px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" /></span>
            {h.badge}
          </span>
          <h1 className="h1 max-w-4xl">{h.h1}</h1>
          <p className="lead mt-5 max-w-2xl text-balance">{h.sub}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <WaButton lang={lang} msg={msg} place="home_hero" /><CallButton lang={lang} place="home_hero" />
          </div>
          <ul className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {h.proof.map(([a, b]) => (
              <li key={a} className="card px-4 py-5"><div className="text-xl font-semibold text-primary">{a}</div><div className="text-sm text-on-variant">{b}</div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-12">
        <h2 className="h2 mb-8">{h.modes_h}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {h.modes.map(([a, b, href], i) => {
            const Ic = [I.Building2, I.Home, I.FlaskConical, I.FileText][i];
            return (
              <Link key={a} href={`${p}${href}`} className="card group p-6 transition-colors hover:border-primary/60">
                <Ic size={28} className="text-primary" aria-hidden /><h3 className="mt-4 text-xl font-medium">{a}</h3><p className="mt-2 text-sm text-on-variant">{b}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">{t.see_more}<I.ArrowRight size={16} aria-hidden /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-x py-12" id="examenes">
        <h2 className="h2">{h.search_h}</h2><p className="lead mt-2 mb-6">{h.search_p}</p>
        <ExamSearch lang={lang} compact labels={labelsOf(lang)} />
        <Link href={`${p}/examenes/`} className="btn-ghost mt-6">{t.see_all} <I.ArrowRight size={16} aria-hidden /></Link>
      </section>

      <section className="container-x py-12">
        <h2 className="h2 mb-8">{h.how_h}</h2>
        <ol className="grid gap-4 md:grid-cols-5">
          {DOM_STEPS.map((s, i) => (
            <li key={i} className="card p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{i + 1}</span>
              <h3 className="mt-3 font-medium">{s.t[lang]}</h3><p className="mt-1 text-sm text-on-variant">{s.d[lang]}</p>
            </li>
          ))}
        </ol>
        <Link href={`${p}/a-domicilio/`} className="btn-ghost mt-6">{t.nav.home_service} <I.ArrowRight size={16} aria-hidden /></Link>
      </section>

      <section className="container-x py-12">
        <h2 className="h2">{h.conv_h}</h2><p className="lead mt-2 mb-8 max-w-3xl">{h.conv_p}</p>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {CONVENIOS.map((c) => (
            <li key={c.slug} className="flex h-24 items-center justify-center rounded-[1.25rem] bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.name} loading="lazy" width={160} height={80} className="max-h-16 w-auto object-contain" />
            </li>
          ))}
        </ul>
        <Link href={`${p}/convenios/`} className="btn-ghost mt-6">{t.nav.insurers} <I.ArrowRight size={16} aria-hidden /></Link>
      </section>

      <section className="container-x py-12">
        <h2 className="h2 mb-8">{h.sedes_h}</h2>
        <SedeGrid lang={lang} />
      </section>

      <LatestPosts lang={lang} />
      <section className="container-x max-w-4xl py-12">
        <h2 className="h2 mb-8">{h.faq_h}</h2>
        <Faq items={faqItems(lang, 6)} />
        <Link href={`${p}/preguntas-frecuentes/`} className="btn-ghost mt-6">{t.see_all}</Link>
      </section>
      <CtaBand lang={lang} title={h.cta_h} text={h.cta_p} msg={msg} place="home_cta" />
      <Json data={[orgLd, faqLd(lang, 6)]} />
    </>
  );
}

export function SedeGrid({ lang, skip, h = 'h3' }: { lang: Lang; skip?: string; h?: 'h2' | 'h3' }) {
  const H = h;
  const t = T(lang).sedes; const p = pre(lang);
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {SEDES.filter((s) => s.slug !== skip).map((s, i) => (
        <li key={s.slug} className="card overflow-hidden">
          <Link href={`${p}/sedes/${s.slug}/`} aria-label={`${t.view} ${s.name}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img.replace('.webp', '-sm.webp')} alt={`BioReferencia ${s.name}`} loading={i < 3 && h === 'h2' ? 'eager' : 'lazy'} width={600} height={300} className="h-44 w-full object-cover" />
          </Link>
          <div className="p-5">
            <H className="text-xl font-medium"><Link href={`${p}/sedes/${s.slug}/`}>{s.name}</Link></H>
            <p className="mt-1 flex gap-2 text-sm text-on-variant"><I.MapPin size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />{s.addr}</p>
            <p className="mt-1 flex gap-2 text-sm text-on-variant"><I.Clock size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />{s.hours[lang][0]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={waLink(t.msg(s.name))} target="_blank" rel="noopener" data-track="whatsapp_click" data-place={`sede_${s.slug}`} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}>{t.book}</a>
              <a href={mapsUrl(s)} target="_blank" rel="noopener" className="rounded-full bg-surface-high px-4 py-2 text-sm">{t.how}</a>
            </div>
          </div>
        </li>
      ))}
      {!skip && (
        <li className="card soon-card overflow-hidden" aria-label={`${SOON_SEDE.name} — ${SOON_SEDE.label[lang]}`}>
          <div className="soon-media flex h-44 w-full items-center justify-center">
            <I.MapPin size={44} className="soon-pin" aria-hidden />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3">
              <H className="text-xl font-medium">{SOON_SEDE.name}</H>
              <span className="soon-badge">{SOON_SEDE.label[lang]}</span>
            </div>
            <p className="mt-1 flex gap-2 text-sm text-on-variant"><I.MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />{SOON_SEDE.city}</p>
            <p className="mt-1 text-sm text-on-variant">{SOON_SEDE.text[lang]}</p>
            <div className="mt-4">
              <a href={waLink(lang === 'es' ? 'Hola, quiero que me avisen cuando abra la sede de BioReferencia en Pereira.' : 'Hello, please let me know when the BioReferencia Pereira site opens.')} target="_blank" rel="noopener" data-track="whatsapp_click" data-place="sede_pereira_soon" className="soon-link rounded-full bg-surface-high px-4 py-2 text-sm">{SOON_SEDE.note[lang]}</a>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}

/* ---------- EXÁMENES ---------- */
export function ExamsHub({ lang }: { lang: Lang }) {
  const t = T(lang).exams;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.exams, href: '/examenes/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{t.h1}</h1><p className="lead mt-4 max-w-3xl">{t.sub}</p>
        {lang === 'en' && <p className="mt-2 text-sm text-on-variant">{t.cat_note}</p>}
        <div className="mt-8"><ExamSearch lang={lang} labels={labelsOf(lang)} /></div>
      </section>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.'} place="exams_hub_cta" />
    </>
  );
}
const Row = ({ k, v }: { k: string; v?: string }) => (v ? <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"><dt className="text-sm text-on-variant">{k}</dt><dd className="sm:col-span-2">{v}</dd></div> : null);

export function ExamPage({ lang, exam }: { lang: Lang; exam: Exam }) {
  const t = T(lang).exams; const p = pre(lang); const msg = t.book_msg(exam.name);
  const rel = (exam.related || []).map((r) => ({ name: r, ex: allExams().find((e) => e.name.toLowerCase() === r.toLowerCase() || e.fullName?.toLowerCase() === r.toLowerCase()) }));
  const ld = { '@context': 'https://schema.org', '@type': ['MedicalWebPage'], name: exam.name, url: `${SITE.url}${p}/examenes/${exam.slug}/`, inLanguage: 'es', about: { '@type': 'MedicalTest', name: exam.name, ...(exam.sample ? { usedToDiagnose: undefined } : {}) }, publisher: { '@id': `${SITE.url}/#org` }, lastReviewed: undefined };
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.exams, href: '/examenes/' }, { name: exam.name, href: `/examenes/${exam.slug}/` }]} />
      <article className="container-x py-10">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{exam.area}</p>
        <h1 className="h1 mt-2 max-w-4xl">{exam.name}</h1>
        {exam.synonyms && exam.synonyms.length > 0 && <p className="mt-2 text-on-variant">{exam.synonyms.slice(0, 4).join(' · ')}</p>}
        {lang === 'en' && <p className="mt-2 text-sm text-on-variant">{t.cat_note}</p>}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row"><WaButton lang={lang} msg={msg} label={t.book} place={`exam_${exam.slug}`} sub={false} /><CallButton lang={lang} place={`exam_${exam.slug}`} /></div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {exam.description && <section><h2 className="h2">{t.about}</h2><p className="mt-3 text-lg leading-relaxed text-on-variant">{exam.description}</p></section>}
            {exam.purpose && <section><h2 className="h2">{t.purpose}</h2><p className="mt-3 text-lg leading-relaxed text-on-variant">{exam.purpose}</p></section>}
            {exam.importance && (
              <section><h2 className="h2">{t.why}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">{exam.importance.items.map((i) => <li key={i} className="card flex gap-2 p-4 text-sm"><I.Check size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />{i}</li>)}</ul>
                {exam.importance.note && <p className="mt-3 text-sm text-on-variant">{exam.importance.note}</p>}
              </section>
            )}
            {exam.kind === 'func' && exam.convRange && (
              <section><h2 className="h2">{t.ranges}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="card p-5"><h3 className="text-sm text-on-variant">{t.conv}</h3><p className="mt-1 text-2xl font-semibold text-primary">{exam.convRange}</p><p className="mt-2 text-sm text-on-variant">{exam.convText}</p></div>
                  <div className="card p-5"><h3 className="text-sm text-on-variant">{t.func}</h3><p className="mt-2 text-sm text-on-variant">{exam.funcText}</p></div>
                </div>
                {exam.levels && <><h3 className="mt-8 text-xl font-medium">{t.levels}</h3>
                  <ul className="mt-3 space-y-3">{exam.levels.map((l) => <li key={l.key} className="card p-4"><div className="flex flex-wrap items-baseline gap-3"><span className="rounded-full bg-primary/20 px-3 py-0.5 text-xs font-bold text-primary">{l.label}</span><span className="font-medium">{l.range}</span></div><p className="mt-2 text-sm text-on-variant">{l.interpretation}</p></li>)}</ul></>}
                {exam.note && <p className="mt-4 rounded-2xl bg-surface-high p-4 text-sm">{exam.note}</p>}
              </section>
            )}
            {exam.factors && exam.factors.length > 0 && <section><h2 className="h2">{lang === 'es' ? 'Factores que pueden modificar el resultado' : 'Factors that can change the result'}</h2><ul className="mt-3 list-disc space-y-1 pl-5 text-on-variant">{exam.factors.map((f) => <li key={f}>{f}</li>)}</ul></section>}
            {rel.length > 0 && <section><h2 className="h2">{t.related}</h2><ul className="mt-3 flex flex-wrap gap-2">{rel.map((r) => <li key={r.name}>{r.ex ? <Link href={`${p}/examenes/${r.ex.slug}/`} className="inline-block rounded-full bg-surface-high px-4 py-2 text-sm hover:bg-surface-highest">{r.name}</Link> : <span className="inline-block rounded-full border border-outline-variant px-4 py-2 text-sm text-on-variant">{r.name}</span>}</li>)}</ul></section>}
            {exam.refs && exam.refs.length > 0 && <section><h2 className="text-lg font-medium">{lang === 'es' ? 'Referencias' : 'References'}</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-on-variant">{exam.refs.map((r) => <li key={r}>{r}</li>)}</ul></section>}
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-medium">{lang === 'es' ? 'Datos del examen' : 'Test details'}</h2>
              <dl className="mt-2 divide-y divide-outline-variant/40 text-sm">
                <Row k={t.sample} v={exam.sample} /><Row k={t.method} v={exam.method} /><Row k={t.container} v={exam.container} /><Row k={t.prep} v={exam.prep} />
                <Row k={t.delivery} v={exam.delivery} /><Row k={t.conditions} v={exam.conditions} /><Row k={t.prereq} v={exam.prereq} /><Row k={t.docs} v={exam.docs} />
                <Row k={t.code} v={exam.code} /><Row k="CUPS" v={exam.cups} />
              </dl>
              <p className="mt-4 text-xs text-on-variant">{t.price_note}</p>
            </div>
            <p className="mt-4 text-xs text-on-variant">{t.disclaimer}</p>
          </aside>
        </div>
      </article>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={msg} place={`exam_${exam.slug}_cta`} />
      <Json data={ld} />
    </>
  );
}

/* ---------- DOMICILIO ---------- */
export function Domicilio({ lang }: { lang: Lang }) {
  const t = T(lang).dom; const p = pre(lang);
  const blocks: [string, string, any][] = [[t.cover_h, t.cover_p, I.MapPin], [t.price_h, t.price_p, I.FileText], [t.prep_h, t.prep_p, I.Clock], [t.bio_h, t.bio_p, I.ShieldCheck]];
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0"><div className="blob-a absolute -top-40 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" /></div>
        <div className="container-x hero-in relative flex flex-col items-center py-20 text-center">
          <h1 className="h1 max-w-4xl">{t.h1}</h1><p className="lead mt-5 max-w-2xl">{t.sub}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row"><WaButton lang={lang} msg={t.msg} place="dom_hero" /><CallButton lang={lang} place="dom_hero" /></div>
        </div>
      </section>
      <section className="container-x py-12"><h2 className="h2 mb-8">{t.steps_h}</h2>
        <ol className="grid gap-4 md:grid-cols-5">{DOM_STEPS.map((s, i) => <li key={i} className="card p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{i + 1}</span><h3 className="mt-3 font-medium">{s.t[lang]}</h3><p className="mt-1 text-sm text-on-variant">{s.d[lang]}</p></li>)}</ol>
      </section>
      <section className="container-x grid gap-4 py-12 md:grid-cols-2">
        {blocks.map(([h, d, Ic]) => <div key={h} className="card p-6"><Ic size={26} className="text-primary" aria-hidden /><h2 className="mt-3 text-xl font-medium">{h}</h2><p className="mt-2 text-on-variant">{d}</p></div>)}
      </section>
      <section className="container-x py-6"><p className="card p-5 text-sm text-on-variant">{t.elite}</p></section>
      <section className="container-x py-12"><h2 className="h2 mb-4">{lang === 'es' ? 'Exámenes más solicitados' : 'Most requested tests'}</h2>
        <ExamSearch lang={lang} compact labels={labelsOf(lang)} /></section>
      <section className="container-x max-w-4xl py-12"><h2 className="h2 mb-8">{t.faq_h}</h2><Faq items={[10, 11, 7, 8, 14, 15].map((i) => ({ q: FAQS[i].q[lang], a: FAQS[i].a[lang] }))} /></section>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={t.msg} place="dom_cta" />
      <Json data={[{ '@context': 'https://schema.org', '@type': 'Service', serviceType: lang === 'es' ? 'Toma de muestras de laboratorio a domicilio' : 'At-home laboratory sample collection', provider: { '@id': `${SITE.url}/#org` }, areaServed: ['Medellín', 'Envigado', 'Rionegro', 'La Ceja', 'El Retiro', 'Marinilla', 'Llanogrande'], url: `${SITE.url}${p}/a-domicilio/` }, faqLd(lang)]} />
    </>
  );
}

/* ---------- CONVENIOS ---------- */
export function Convenios({ lang }: { lang: Lang }) {
  const t = T(lang).conv;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.insurers, href: '/convenios/' }]} />
      <section className="container-x py-10"><h1 className="h1 max-w-4xl">{t.h1}</h1><p className="lead mt-4 max-w-3xl">{t.sub}</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONVENIOS.map((c) => (
            <li key={c.slug} className="card overflow-hidden">
              <div className="flex h-28 items-center justify-center bg-white p-4">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.img} alt={c.name} loading="lazy" width={200} height={100} className="max-h-20 w-auto object-contain" /></div>
              <div className="p-4"><h2 className="font-medium">{c.name}</h2>
                <a href={waLink(t.msg(c.name))} target="_blank" rel="noopener" data-track="whatsapp_click" data-place={`convenio_${c.slug}`} className="mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}>{t.ask(c.name)}</a></div>
            </li>
          ))}
        </ul>
      </section>
      <section className="container-x py-10"><h2 className="h2 mb-6">{t.how_h}</h2>
        <ol className="grid gap-4 md:grid-cols-3">{t.how.map((h, i) => <li key={i} className="card p-6"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{i + 1}</span><p className="mt-3">{h}</p></li>)}</ol>
        <p className="mt-6 text-on-variant"><strong className="text-on-surface">{t.bring_h}:</strong> {t.bring}</p><p className="mt-3 text-sm text-on-variant">{t.note}</p></section>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={t.msg_gen} place="convenios_cta" />
    </>
  );
}

/* ---------- SEDES ---------- */
export function SedesIndex({ lang }: { lang: Lang }) {
  const t = T(lang).sedes;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.sites, href: '/sedes/' }]} />
      <section className="container-x py-10"><h1 className="h1">{t.h1}</h1><p className="lead mt-4">{t.sub}</p><div className="mt-10"><SedeGrid lang={lang} h="h2" /></div>
        <p className="mt-8 text-sm text-on-variant">{PROCESSING[lang]}</p><p className="mt-1 text-sm text-on-variant">{t.soon}</p></section>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={lang === 'es' ? 'Hola, quiero agendar una cita en una sede de BioReferencia.' : 'Hello, I want to book an appointment at a BioReferencia site.'} place="sedes_cta" />
      <Json data={SEDES.map((s) => sedeLd(s, lang))} />
    </>
  );
}
export function SedePage({ lang, sede }: { lang: Lang; sede: Sede }) {
  const t = T(lang).sedes;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.sites, href: '/sedes/' }, { name: sede.name, href: `/sedes/${sede.slug}/` }]} />
      <section className="container-x grid gap-10 py-10 lg:grid-cols-2">
        <div>
          <h1 className="h1">{lang === 'es' ? `Laboratorio clínico en ${sede.name}, ${sede.city}` : `Clinical laboratory in ${sede.name}, ${sede.city}`}</h1>
          <p className="lead mt-3">{sede.place[lang]}</p>
          <dl className="mt-8 space-y-6">
            <div><dt className="flex items-center gap-2 text-sm text-on-variant"><I.MapPin size={16} className="text-primary" aria-hidden />{t.addr}</dt><dd className="mt-1 text-lg">{sede.addr}</dd></div>
            <div><dt className="flex items-center gap-2 text-sm text-on-variant"><I.Clock size={16} className="text-primary" aria-hidden />{t.hours}</dt><dd className="mt-1 text-lg">{sede.hours[lang].map((h) => <div key={h}>{h}</div>)}</dd></div>
          </dl>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row"><WaButton lang={lang} msg={t.msg(sede.name)} label={t.book} place={`sede_${sede.slug}`} sub={false} />
            <a href={mapsUrl(sede)} target="_blank" rel="noopener" className="btn-ghost"><I.Navigation size={18} className="text-primary" aria-hidden />{t.how}</a></div>
          <p className="mt-8 text-on-variant"><strong className="text-on-surface">{t.bring_h}:</strong> {t.bring}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sede.img} alt={`BioReferencia ${sede.name}`} width={800} height={800} className="w-full rounded-[1.5rem] object-cover" />
      </section>
      <section className="container-x py-10"><h2 className="h2 mb-6">{t.other}</h2><SedeGrid lang={lang} skip={sede.slug} /></section>
      <Json data={sedeLd(sede, lang)} />
    </>
  );
}

/* ---------- REFERENCIA / RESULTADOS / FAQ / NOSOTROS ---------- */
export function Reference({ lang }: { lang: Lang }) {
  const t = T(lang).ref;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.reference, href: '/laboratorio-de-referencia/' }]} />
      <section className="container-x py-10"><h1 className="h1 max-w-4xl">{t.h1}</h1><p className="lead mt-4 max-w-3xl">{t.sub}</p>
        <div className="mt-8"><WaButton lang={lang} msg={t.msg} label={t.cta} place="ref_hero" sub={false} /></div></section>
      <section className="container-x py-10"><h2 className="h2 mb-6">{t.h2}</h2>
        <ol className="grid gap-4 md:grid-cols-3">{REF_STEPS.map((s, i) => <li key={i} className="card p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{i + 1}</span><h3 className="mt-3 font-medium">{s.t[lang]}</h3><p className="mt-1 text-sm text-on-variant">{s.d[lang]}</p></li>)}</ol>
        <p className="mt-8 text-on-variant"><strong className="text-on-surface">{t.for_h}:</strong> {t.for}</p></section>
      <CtaBand lang={lang} title={t.cta} text={T(lang).home.cta_p} msg={t.msg} place="ref_cta" />
    </>
  );
}
export function Results({ lang }: { lang: Lang }) {
  const t = T(lang).res;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: T(lang).nav.results, href: '/resultados/' }]} />
      <section className="container-x max-w-3xl py-14 text-center"><h1 className="h1">{t.h1}</h1><p className="lead mt-4">{t.sub}</p>
        <a href={SITE.results} target="_blank" rel="noopener" data-track="results_click" data-place="results_page" className="btn-wa mt-8">{t.btn}<I.ArrowRight size={20} aria-hidden /></a>
        <div className="card mt-14 p-6 text-left"><h2 className="text-xl font-medium">{t.help_h}</h2><p className="mt-2 text-on-variant">{t.help}</p><p className="mt-3 text-sm text-on-variant">{t.pay}</p>
          <div className="mt-5 flex flex-wrap gap-3"><WaButton lang={lang} msg={lang === 'es' ? 'Hola, necesito ayuda con mis resultados.' : 'Hello, I need help with my results.'} place="results_help" sub={false} /><CallButton lang={lang} place="results_help" /></div></div></section>
    </>
  );
}
export function FaqPage({ lang }: { lang: Lang }) {
  const t = T(lang).faq;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: t.h1, href: '/preguntas-frecuentes/' }]} />
      <section className="container-x max-w-4xl py-10"><h1 className="h1">{t.h1}</h1><p className="lead mt-4">{t.sub}</p><div className="mt-8"><Faq items={faqItems(lang)} /></div></section>
      <CtaBand lang={lang} title={t.more_h} text={t.more_p} msg={t.msg} place="faq_cta" />
      <Json data={faqLd(lang)} />
    </>
  );
}
export function About({ lang }: { lang: Lang }) {
  const t = T(lang).about;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: lang === 'es' ? 'Quiénes somos' : 'About us', href: '/quienes-somos/' }]} />
      <section className="container-x max-w-4xl py-10"><h1 className="h1">{t.h1}</h1><p className="lead mt-4">{t.p1}</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{t.pillars.map(([a, b], i) => <div key={a} className="card p-6"><span className="text-sm font-bold text-primary">0{i + 1}</span><h2 className="mt-2 text-xl font-medium">{a}</h2><p className="mt-2 text-sm text-on-variant">{b}</p></div>)}</div>
        <h2 className="h2 mt-12">{t.purpose_h}</h2><p className="lead mt-2">{t.purpose}</p><h2 className="h2 mt-8">{t.mission_h}</h2><p className="lead mt-2">{t.mission}</p></section>
      <CtaBand lang={lang} title={T(lang).home.cta_h} text={T(lang).home.cta_p} msg={lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.'} place="about_cta" />
    </>
  );
}
export function NotFound({ lang }: { lang: Lang }) {
  const t = T(lang);
  return <section className="container-x py-32 text-center"><h1 className="h1">{t.n404}</h1><p className="lead mt-4">{t.n404p}</p><Link href={lang === 'en' ? '/en/' : '/'} className="btn-ghost mt-8">{t.back}</Link></section>;
}

/* ---------- BLOG ---------- */
const fmtDate = (d: string, l: Lang) => new Date(d + 'T12:00:00').toLocaleDateString(l === 'es' ? 'es-CO' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
export function PostCard({ post, lang, h = 'h3', eager = false }: { post: Post; lang: Lang; h?: 'h2' | 'h3'; eager?: boolean }) {
  const H = h;
  const p = pre(lang);
  return (
    <li className="card overflow-hidden">
      <Link href={`${p}/blog/${post.slug}/`} aria-label={post.title}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {post.img && <img src={post.img.replace('.webp', '-sm.webp')} alt={post.alt} loading={eager ? 'eager' : 'lazy'} width={600} height={340} className="h-44 w-full object-cover" />}
      </Link>
      <div className="p-5"><time className="text-xs text-primary" dateTime={post.date}>{fmtDate(post.date, lang)}</time>
        <H className="mt-1 text-lg font-medium leading-snug"><Link href={`${p}/blog/${post.slug}/`}>{post.title}</Link></H>
        <p className="mt-2 line-clamp-3 text-sm text-on-variant">{post.desc}</p></div>
    </li>
  );
}
export function BlogIndex({ lang }: { lang: Lang }) {
  const t = T(lang).blog;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: 'Blog', href: '/blog/' }]} />
      <section className="container-x py-10"><h1 className="h1">{t.h1}</h1><p className="lead mt-4">{t.sub}</p>
        {lang === 'en' && <p className="mt-2 text-sm text-on-variant">{t.note}</p>}
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts().map((x, i) => <PostCard key={x.slug} post={x} lang={lang} h="h2" eager={i < 3} />)}</ul></section>
      <CtaBand lang={lang} title={t.cta} text={T(lang).home.cta_p} msg={lang === 'es' ? 'Hola, quiero información sobre mis exámenes.' : 'Hello, I would like information about my tests.'} place="blog_cta" />
    </>
  );
}
export function BlogPost({ lang, post }: { lang: Lang; post: Post }) {
  const t = T(lang).blog; const p = pre(lang);
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.desc, datePublished: post.date, dateModified: post.date, inLanguage: 'es', image: post.img ? SITE.url + post.img : undefined,
    mainEntityOfPage: `${SITE.url}${p}/blog/${post.slug}/`, author: { '@type': 'Organization', name: 'BioReferencia', '@id': `${SITE.url}/#org` }, publisher: { '@id': `${SITE.url}/#org` } };
  const msg = lang === 'es' ? `Hola, leí el artículo "${post.title}" y quiero agendar un examen.` : `Hello, I read the article "${post.title}" and I want to book a test.`;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: 'Blog', href: '/blog/' }, { name: post.title, href: `/blog/${post.slug}/` }]} />
      <article className="container-x max-w-3xl py-10">
        <time className="text-sm text-primary" dateTime={post.date}>{t.toc}: {fmtDate(post.date, lang)}</time>
        <h1 className="h1 mt-2">{post.title}</h1>
        {lang === 'en' && <p className="mt-2 text-sm text-on-variant">{t.note}</p>}
        {post.img && /* eslint-disable-next-line @next/next/no-img-element */ <img src={post.img} alt={post.alt} width={1100} height={620} fetchPriority="high" className="mt-8 w-full rounded-[1.5rem] object-cover" />}
        <div className="prose-x mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
        <p className="mt-10 text-sm text-on-variant">{T(lang).exams.disclaimer}</p>
        <Link href={`${p}/blog/`} className="btn-ghost mt-6">{t.back}</Link>
      </article>
      <CtaBand lang={lang} title={t.cta} text={T(lang).home.cta_p} msg={msg} place={`blog_${post.slug}`} />
      <Json data={ld} />
    </>
  );
}
export function LatestPosts({ lang }: { lang: Lang }) {
  const t = T(lang).blog;
  return (
    <section className="container-x py-12"><div className="mb-8 flex items-end justify-between gap-4"><h2 className="h2">{t.latest}</h2><Link href={`${pre(lang)}/blog/`} className="btn-ghost">{T(lang).see_all}</Link></div>
      <ul className="grid gap-5 md:grid-cols-3">{posts().slice(0, 3).map((x) => <PostCard key={x.slug} post={x} lang={lang} />)}</ul></section>
  );
}

/* ---------- USUARIO ÉLITE / CHEQUEOS ---------- */
export function Elite({ lang }: { lang: Lang }) {
  const t = T(lang).elite;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: t.h1, href: '/usuario-elite/' }]} />
      <ScrollStory title={t.h1} sub={t.sub} items={t.items as unknown as string[][]} note={t.tyc} cta={<WaButton lang={lang} msg={t.msg} label={t.cta} place="elite_hero" sub={false} />} />
    </>
  );
}
export function Chequeos({ lang }: { lang: Lang }) {
  const t = T(lang).chk;
  return (
    <>
      <Crumbs lang={lang} items={[{ name: t.h1, href: '/chequeos-ejecutivos/' }]} />
      <section className="container-x py-10"><h1 className="h1">{t.h1}</h1><p className="lead mt-4 max-w-3xl">{t.sub}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{t.types.map(([a, b]) => <div key={a} className="card p-6"><h2 className="text-xl font-medium">{a}</h2><p className="mt-2 text-on-variant">{b}</p></div>)}</div>
        <h2 className="h2 mt-12 mb-6">{t.how}</h2><ol className="grid gap-4 md:grid-cols-3">{t.steps.map((x, i) => <li key={i} className="card p-6"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{i + 1}</span><p className="mt-3">{x}</p></li>)}</ol>
        <p className="mt-6 text-sm text-on-variant">{t.note}</p><div className="mt-8"><WaButton lang={lang} msg={t.msg} label={t.cta} place="chequeos_hero" sub={false} /></div></section>
    </>
  );
}
