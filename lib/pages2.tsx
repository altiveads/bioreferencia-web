import Link from 'next/link';
import { WaButton, CtaBand } from '@/components/Cta';
import { Crumbs } from '@/components/Crumbs';
import { PqrsfForm } from '@/components/PqrsfForm';
import { CopyEmail } from '@/components/CopyEmail';
import { SITE, waLink, type Lang } from './site';

const pre = (l: Lang) => (l === 'en' ? '/en' : '');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const X = (l: Lang) => (es: any, en: any): any => (l === 'es' ? es : en);

export const NEW_META: Record<string, { es: [string, string]; en: [string, string] }> = {
  politicas: { es: ['Políticas y documentos | BioReferencia', 'Políticas de calidad, seguridad del paciente, protección de datos personales, gestión del riesgo y derechos y deberes de los usuarios de BioReferencia.'], en: ['Policies and documents | BioReferencia', 'BioReferencia quality, patient safety, personal data protection and risk management policies, and user rights and duties.'] },
  pqrsf: { es: ['PQRSF: peticiones, quejas, reclamos y sugerencias | BioReferencia', 'Radica tu petición, queja, reclamo, sugerencia o felicitación a BioReferencia. Tu voz es nuestra prioridad.'], en: ['Requests, complaints and suggestions (PQRSF) | BioReferencia', 'Send BioReferencia a request, complaint, claim, suggestion or compliment. Your voice is our priority.'] },
  'trabaja-con-nosotros': { es: ['Trabaja con nosotros | BioReferencia', 'Súmate al equipo de BioReferencia, laboratorio clínico en Medellín y el Oriente antioqueño. Conoce el perfil que buscamos y cómo enviar tu hoja de vida.'], en: ['Work with us | BioReferencia', 'Join the BioReferencia team. Learn about the profile we look for and how to send your CV.'] },
  'innovacion-y-desarrollo': { es: ['Innovación y Desarrollo: pruebas funcionales y terapia celular autóloga | BioReferencia', 'Soluciones diagnósticas avanzadas de BioReferencia: terapia celular autóloga (Bioplasma), pruebas funcionales y asesoría científica para médicos.'], en: ['Innovation & Development: functional tests and autologous cell therapy | BioReferencia', 'Advanced diagnostic solutions by BioReferencia: autologous cell therapy (Bioplasma), functional tests and scientific advisory for doctors.'] },
  'kit-wellness': { es: ['Kit Wellness: kits de bienestar y prevención | BioReferencia', 'Kits de BioReferencia para conocer mejor tu salud desde casa: digestiva, renal, energía, balance hormonal y salud sexual. Resultado 100% digital.'], en: ['Kit Wellness: wellness and prevention kits | BioReferencia', 'BioReferencia kits to understand your health from home: digestive, renal, energy, hormonal balance and sexual health. 100% digital results.'] },
};

/* ---------------- POLÍTICAS ---------------- */
const POLS = [
  { f: 'proteccion-de-datos-personales', es: ['Protección de datos personales', 'Cómo recolectamos, usamos y protegemos tu información, y cómo ejercer tus derechos (Ley 1581 de 2012).'], en: ['Personal data protection', 'How we collect, use and protect your information, and how to exercise your rights (Law 1581 of 2012).'] },
  { f: 'seguridad-del-paciente', es: ['Seguridad del paciente', 'Nuestro compromiso con una atención segura y la prevención de eventos adversos.'], en: ['Patient safety', 'Our commitment to safe care and the prevention of adverse events.'] },
  { f: 'derechos-y-deberes', es: ['Derechos y deberes de los usuarios', 'Lo que puedes esperar de nosotros y lo que esperamos de ti.'], en: ['User rights and duties', 'What you can expect from us and what we expect from you.'] },
  { f: 'calidad', es: ['Política de calidad', 'Principios de nuestro sistema de gestión de calidad.'], en: ['Quality policy', 'Principles of our quality management system.'] },
  { f: 'gestion-del-riesgo', es: ['Gestión del riesgo', 'Cómo identificamos y controlamos los riesgos en nuestros procesos.'], en: ['Risk management', 'How we identify and control risks in our processes.'] },
  { f: 'no-reuso', es: ['No reúso', 'Política sobre el no reúso de dispositivos y materiales de un solo uso.'], en: ['No reuse', 'Policy on not reusing single-use devices and materials.'] },
  { f: 'seguridad-y-salud-en-el-trabajo', es: ['Seguridad y salud en el trabajo', 'Compromiso con el bienestar y la seguridad de nuestros colaboradores.'], en: ['Occupational health and safety', 'Commitment to the wellbeing and safety of our team.'] },
];
export function Politicas({ lang }: { lang: Lang }) {
  const x = X(lang);
  return (
    <>
      <Crumbs lang={lang} items={[{ name: x('Políticas', 'Policies'), href: '/politicas/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{x('Políticas y documentos', 'Policies and documents')}</h1>
        <p className="lead mt-4 max-w-3xl">{x('Transparencia en cómo trabajamos. Aquí encuentras nuestras políticas en PDF.', 'Transparency in how we work. Our policies are available here as PDF files.')}</p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {POLS.map((p) => (
            <li key={p.f} className="card flex flex-col justify-between p-6">
              <div><h2 className="text-xl font-medium">{p[lang][0]}</h2><p className="mt-2 text-on-variant">{p[lang][1]}</p></div>
              <a href={`/docs/politicas/${p.f}.pdf`} target="_blank" rel="noopener" className="btn-ghost mt-5 self-start !py-3">{x('Ver PDF', 'View PDF')} →</a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-on-variant">{x('¿Quieres ejercer tus derechos sobre tus datos personales? Escríbenos desde PQRSF.', 'Want to exercise your rights over your personal data? Write to us through PQRSF.')} <Link className="text-primary underline underline-offset-4" href={`${pre(lang)}/pqrsf/`}>PQRSF</Link></p>
      </section>
    </>
  );
}

/* ---------------- PQRSF ---------------- */
export function Pqrsf({ lang }: { lang: Lang }) {
  const x = X(lang);
  const kinds = [
    [x('Petición', 'Request'), x('Solicitud respetuosa de información o de un servicio.', 'A respectful request for information or a service.')],
    [x('Queja', 'Complaint'), x('Inconformidad con la actuación de un colaborador.', 'Disagreement with the conduct of a team member.')],
    [x('Reclamo', 'Claim'), x('Falla o deficiencia en la prestación del servicio.', 'A failure or shortcoming in the service.')],
    [x('Sugerencia', 'Suggestion'), x('Una idea para mejorar nuestros procesos o servicios.', 'An idea to improve our processes or services.')],
    [x('Felicitación', 'Compliment'), x('Reconocimiento por una buena atención.', 'Recognition for good care.')],
  ];
  return (
    <>
      <Crumbs lang={lang} items={[{ name: 'PQRSF', href: '/pqrsf/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{x('Tu voz, nuestra prioridad', 'Your voice, our priority')}</h1>
        <p className="lead mt-4 max-w-3xl">{x('Cuéntanos tu petición, queja, reclamo, sugerencia o felicitación. Cada mensaje lo lee y lo atiende nuestro equipo.', 'Tell us your request, complaint, claim, suggestion or compliment. Every message is read and handled by our team.')}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {kinds.map(([a, b]: any) => <li key={a} className="card p-5"><h2 className="font-medium">{a}</h2><p className="mt-1 text-sm text-on-variant">{b}</p></li>)}
        </ul>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <PqrsfForm lang={lang} />
          <aside className="card h-fit p-6">
            <h2 className="text-lg font-medium">{x('¿Prefieres hablar con nosotros?', 'Prefer to talk to us?')}</h2>
            <p className="mt-3 text-sm text-on-variant">{x('Línea de atención', 'Phone line')}<br /><a className="text-on-surface" href={`tel:${SITE.tel}`}>{SITE.telDisplay}</a> · {x('opción 5', 'option 5')}</p>
            <p className="mt-3 text-sm text-on-variant">{x('Correo', 'Email')}<br /><a className="break-all text-primary" href="mailto:experienciaymercadeo@bioreferencia.com">experienciaymercadeo@bioreferencia.com</a></p>
            <div className="mt-5"><WaButton lang={lang} msg={x('Hola, quiero radicar una PQRSF.', 'Hello, I would like to submit a request or complaint.')} place="pqrsf" sub={false} label={x('Escríbenos por WhatsApp', 'Message us on WhatsApp')} /></div>
            <p className="mt-5 text-xs text-on-variant">{x('Tus datos se tratan según la Ley 1581 de 2012.', 'Your data is handled under Colombian Law 1581 of 2012.')}</p>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ---------------- TRABAJA CON NOSOTROS ---------------- */
export function Trabaja({ lang }: { lang: Lang }) {
  const x = X(lang); const email = 'pasionporelservicio@bioreferencia.com';
  const traits = x(['Solucionadores', 'Serviciales', 'Asertivos', 'Coordinados', 'Íntegros'], ['Problem solvers', 'Helpful', 'Assertive', 'Coordinated', 'Honest']);
  const items = x([
    ['Datos personales completos', 'nombre, contacto, correo y ciudad de residencia.'], ['Formación académica', 'título, institución y año de grado.'], ['Experiencia laboral', 'cargos, funciones y tiempo de permanencia.'],
    ['Certificaciones o cursos', 'relacionados con el cargo al que aplicas.'], ['Disponibilidad', 'de horario y de inicio.'], ['Foto reciente', 'tipo documento (opcional, recomendada).'],
  ], [
    ['Full personal details', 'name, contact, email and city of residence.'], ['Education', 'degree, institution and graduation year.'], ['Work experience', 'roles, duties and time in each position.'],
    ['Certifications or courses', 'related to the position you apply for.'], ['Availability', 'for schedule and start date.'], ['Recent photo', 'passport style (optional, recommended).'],
  ]);
  return (
    <>
      <Crumbs lang={lang} items={[{ name: x('Trabaja con nosotros', 'Work with us'), href: '/trabaja-con-nosotros/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{x('Súmate al equipo que cuida la salud de miles de familias', 'Join the team that looks after the health of thousands of families')}</h1>
        <p className="lead mt-4 max-w-3xl">{x('Buscamos personas rigurosas y cercanas para acompañar procesos de laboratorio clínico con precisión y calidez humana.', 'We look for rigorous, caring people to support clinical laboratory processes with precision and human warmth.')}</p>
        <h2 className="h2 mt-12">{x('El perfil que buscamos', 'The profile we look for')}</h2>
        <ul className="mt-5 flex flex-wrap gap-3">{traits.map((t: string) => <li key={t} className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-primary">{t}</li>)}</ul>
        <h2 className="h2 mt-12">{x('Cómo enviar tu hoja de vida', 'How to send your CV')}</h2>
        <p className="lead mt-3">{x('Prepara tu documento con esta información:', 'Prepare your document with this information:')}</p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{items.map(([a, b]: any) => <li key={a} className="card p-5"><h3 className="font-medium">{a}</h3><p className="mt-1 text-sm text-on-variant">{b}</p></li>)}</ul>
        <div className="card mt-8 p-6 md:p-8">
          <h2 className="text-xl font-medium">{x('Envíala a este correo', 'Send it to this email')}</h2>
          <CopyEmail email={email} copy={x('Copiar correo', 'Copy email')} copied={x('¡Copiado!', 'Copied!')} />
          <p className="mt-4 text-sm text-on-variant">{x('En formato PDF y con el asunto «Hoja de vida — [tu nombre]».', 'As a PDF, with the subject “CV — [your name]”.')}</p>
        </div>
        <div className="mt-8"><WaButton lang={lang} msg={x('Hola, quiero información sobre trabajar en BioReferencia.', 'Hello, I would like information about working at BioReferencia.')} place="empleo" sub={false} label={x('Escríbenos por WhatsApp', 'Message us on WhatsApp')} /></div>
      </section>
    </>
  );
}

/* ---------------- INNOVACIÓN Y DESARROLLO ---------------- */
export function Innovacion({ lang }: { lang: Lang }) {
  const x = X(lang); const msg = x('Hola, quiero información sobre Innovación y Desarrollo de BioReferencia.', 'Hello, I would like information about BioReferencia Innovation & Development.');
  const prods = x([
    ['Producto autólogo', 'Bioplasma RFC', 'Suero autólogo rico en factores de crecimiento, orientado al apoyo en reparación, cicatrización y regeneración tisular.', ['Producto autólogo y biocompatible', 'Apoyo en medicina estética, ortopedia y reparación tisular', 'Control de calidad, esterilidad y trazabilidad']],
    ['Soporte ocular regenerativo', 'Bioplasma Oftálmico', 'Suero autólogo al 20% para soporte regenerativo de la superficie ocular, elaborado a partir de componentes sanguíneos del propio paciente.', ['Apoyo en ojo seco, queratitis y lesiones corneales', 'Efecto hidratante, lubricante y regenerativo', 'Kit mensual con goteros de suero autólogo']],
  ], [
    ['Autologous product', 'Bioplasma RFC', 'Autologous serum rich in growth factors, aimed at supporting tissue repair, healing and regeneration.', ['Autologous and biocompatible product', 'Support in aesthetic medicine, orthopedics and tissue repair', 'Quality control, sterility and traceability']],
    ['Regenerative eye support', 'Bioplasma Ophthalmic', '20% autologous serum for regenerative support of the ocular surface, made from the patient’s own blood components.', ['Support in dry eye, keratitis and corneal injuries', 'Hydrating, lubricating and regenerative effect', 'Monthly kit with autologous serum dropper bottles']],
  ]);
  const tests = x([
    ['Diagnóstico funcional', 'Perfil Adrenal Funcional Plus', 'Evalúa cortisol salival seriado y DHEA-S para analizar estrés, fatiga, sueño y función del eje HPA.'],
    ['Ritmo biológico', 'Mapa Circadiano del Cortisol', 'Prueba funcional con 6 muestras salivales para observar la dinámica del cortisol durante el día.'],
    ['Activación matutina', 'Perfil CAR', 'Evalúa la respuesta de cortisol durante los primeros minutos después del despertar.'],
    ['Riesgo cardiovascular', 'Perfil Lipídico Ampliado', 'Integra ApoB, colesterol no-HDL y Lipoproteína(a) para una evaluación cardiovascular más completa.'],
  ], [
    ['Functional diagnosis', 'Adrenal Functional Profile Plus', 'Measures serial salivary cortisol and DHEA-S to assess stress, fatigue, sleep and HPA-axis function.'],
    ['Biological rhythm', 'Cortisol Circadian Map', 'Functional test with 6 saliva samples to observe cortisol dynamics throughout the day.'],
    ['Morning activation', 'CAR Profile', 'Measures the cortisol response during the first minutes after waking.'],
    ['Cardiovascular risk', 'Extended Lipid Profile', 'Integrates ApoB, non-HDL cholesterol and Lipoprotein(a) for a more complete cardiovascular assessment.'],
  ]);
  const fields = x(['Odontología y cirugía maxilofacial', 'Ortopedia y traumatología', 'Medicina plástica y estética', 'Oftalmología', 'Diabetología', 'Medicina deportiva', 'Manejo del dolor', 'Medicina vascular', 'Quemaduras'], ['Dentistry and maxillofacial surgery', 'Orthopedics and traumatology', 'Plastic and aesthetic medicine', 'Ophthalmology', 'Diabetology', 'Sports medicine', 'Pain management', 'Vascular medicine', 'Burns']);
  return (
    <>
      <Crumbs lang={lang} items={[{ name: x('Innovación y Desarrollo', 'Innovation & Development'), href: '/innovacion-y-desarrollo/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{x('Soluciones diagnósticas avanzadas para una medicina más precisa', 'Advanced diagnostic solutions for more precise medicine')}</h1>
        <p className="lead mt-4 max-w-3xl">{x('Desarrollamos alternativas de apoyo diagnóstico, regenerativo y funcional, con respaldo científico, trazabilidad y acompañamiento técnico para el médico.', 'We develop diagnostic, regenerative and functional support alternatives, with scientific backing, traceability and technical support for the physician.')}</p>

        <h2 className="h2 mt-14">{x('Terapia celular autóloga', 'Autologous cell therapy')}</h2>
        <p className="lead mt-3 max-w-3xl">{x('Productos derivados del suero del propio paciente, elaborados con protocolos de laboratorio de alta exigencia: manejo cuidadoso de la muestra, esterilidad y control de calidad en cada lote.', 'Products made from the patient’s own serum, produced under demanding laboratory protocols: careful sample handling, sterility and quality control for every batch.')}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {prods.map(([tag, name, d, bl]: any) => (
            <article key={name} className="card p-7">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">{tag}</span>
              <h3 className="mt-2 text-2xl font-medium">{name}</h3><p className="mt-3 text-on-variant">{d}</p>
              <ul className="mt-5 space-y-2 text-sm">{bl.map((b: string) => <li key={b} className="flex gap-2"><span className="text-primary" aria-hidden>→</span>{b}</li>)}</ul>
            </article>
          ))}
        </div>
        <h3 className="mt-8 text-lg font-medium">{x('Campos en los que se utiliza', 'Fields where it is used')}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">{fields.map((f: string) => <li key={f} className="rounded-full bg-surface-high px-4 py-1.5 text-sm text-on-variant">{f}</li>)}</ul>
        <p className="mt-4 text-sm text-on-variant">{x('Uso bajo indicación y supervisión del médico tratante. Los resultados dependen de cada paciente.', 'For use under the indication and supervision of the treating physician. Results depend on each patient.')}</p>
        <p className="mt-3 text-sm text-on-variant">{x('Ofrecemos la toma de muestras de suero autólogo a domicilio en el área metropolitana y el Oriente antioqueño.', 'We offer at-home collection of autologous serum samples in the metropolitan area and the Eastern Antioquia region.')}</p>

        <h2 className="h2 mt-14">{x('Pruebas funcionales avanzadas', 'Advanced functional tests')}</h2>
        <p className="lead mt-3">{x('Evaluaciones complementarias para una visión clínica más completa.', 'Complementary assessments for a more complete clinical picture.')}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {tests.map(([tag, name, d]: any) => (
            <article key={name} className="card p-6"><span className="text-xs font-medium uppercase tracking-widest text-primary">{tag}</span><h3 className="mt-2 text-xl font-medium">{name}</h3><p className="mt-2 text-on-variant">{d}</p></article>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} title={x('Ciencia, calidad y experiencia al servicio de la salud', 'Science, quality and experience at the service of health')} text={x('Acompañamos a los médicos con pruebas diferenciales, orientación técnica y respaldo del laboratorio.', 'We support physicians with differential tests, technical guidance and laboratory backing.')} msg={msg} place="innovacion_cta" />
    </>
  );
}

/* ---------------- KIT WELLNESS ---------------- */
export function KitWellness({ lang }: { lang: Lang }) {
  const x = X(lang); const msg = x('Hola, quiero información sobre los Kit Wellness de BioReferencia.', 'Hello, I would like information about BioReferencia Kit Wellness.');
  const kits = x([
    ['01', 'Salud Digestiva', 'Heces', 'Pruebas sobre digestión, inflamación intestinal, sangrado oculto y presencia de Helicobacter pylori.'],
    ['02', 'Despierta con Energía', 'Saliva', 'Evaluación del cortisol durante la primera hora después de despertar, con tres muestras.'],
    ['03', 'Medición Renal', 'Orina', 'Indicadores importantes de tu salud renal a partir de una muestra de orina.'],
    ['04', 'Balance Hormonal', 'Saliva', 'Cómo varía tu cortisol durante el día con seis muestras de saliva, desde el despertar hasta la noche.'],
    ['05', 'Energía Celular', 'Orina', 'Una muestra de orina para evaluar 76 marcadores del metabolismo, la nutrición y la función mitocondrial.'],
    ['06', 'BioTest Salud Sexual', 'Orina', 'Detección molecular de microorganismos asociados con infecciones de transmisión sexual, con una sola muestra.'],
  ], [
    ['01', 'Digestive Health', 'Stool', 'Tests on digestion, intestinal inflammation, occult bleeding and Helicobacter pylori.'],
    ['02', 'Wake Up with Energy', 'Saliva', 'Cortisol assessment during the first hour after waking, with three samples.'],
    ['03', 'Kidney Measurement', 'Urine', 'Key indicators of your kidney health from a urine sample.'],
    ['04', 'Hormonal Balance', 'Saliva', 'How your cortisol changes through the day, with six saliva samples from waking to night.'],
    ['05', 'Cellular Energy', 'Urine', 'One urine sample to assess 76 markers of metabolism, nutrition and mitochondrial function.'],
    ['06', 'BioTest Sexual Health', 'Urine', 'Molecular detection of microorganisms associated with sexually transmitted infections, from a single sample.'],
  ]);
  const steps = x([['Elige tu kit', 'Revisa cuál se ajusta a lo que quieres conocer de tu salud. Un asesor te orienta por WhatsApp.'], ['Recolecta tu muestra', 'Sigue el instructivo que viene en el kit. Es una toma sencilla, no invasiva.'], ['Recibe tu resultado', 'Coordinamos la recolección y recibes tu resultado 100% digital.']], [['Choose your kit', 'See which one fits what you want to know about your health. An advisor will guide you on WhatsApp.'], ['Collect your sample', 'Follow the instructions in the kit. It is simple and non-invasive.'], ['Get your result', 'We arrange the pick-up and you receive your 100% digital result.']]);
  return (
    <>
      <Crumbs lang={lang} items={[{ name: 'Kit Wellness', href: '/kit-wellness/' }]} />
      <section className="container-x py-10">
        <h1 className="h1">{x('Más que un kit, una ruta de bienestar', 'More than a kit, a wellness route')}</h1>
        <p className="lead mt-4 max-w-3xl">{x('Diagnóstico preventivo de referencia clínica, desde la comodidad de tu hogar.', 'Reference-quality preventive diagnostics, from the comfort of your home.')}</p>
        <ul className="mt-6 flex flex-wrap gap-3 text-sm">{x(['Recolección a domicilio', 'Pruebas no invasivas', 'Resultado 100% digital'], ['Home collection', 'Non-invasive tests', '100% digital results']).map((b: string) => <li key={b} className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-primary">{b}</li>)}</ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <WaButton lang={lang} msg={msg} place="kit_hero" sub={false} label={x('Hablar por WhatsApp', 'Chat on WhatsApp')} />
          <a className="btn-ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/Farmacias+Pasteur" data-track="kit_buy_click" data-place="kit_hero">{x('Cómpralo en Farmacias Pasteur', 'Buy at Farmacias Pasteur')}</a>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kits.map(([n, name, sample, d]: any) => (
            <li key={n} className="card flex flex-col p-6">
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-primary">Kit {n}</span><span className="rounded-full bg-surface-high px-3 py-1 text-xs text-on-variant">{x('Muestra: ', 'Sample: ')}{sample}</span></div>
              <h2 className="mt-3 text-xl font-medium">{name}</h2><p className="mt-2 flex-1 text-on-variant">{d}</p>
              <a href={waLink(x(`Hola, quiero información del Kit ${name}.`, `Hello, I would like information about the ${name} kit.`))} target="_blank" rel="noopener" data-track="whatsapp_click" data-place={`kit_${n}`} className="btn-ghost mt-5 self-start !py-3">{x('Preguntar por este kit', 'Ask about this kit')} →</a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-on-variant">{x('Los resultados deben interpretarse junto con los antecedentes y la condición clínica de cada persona. Los kits no reemplazan la valoración médica.', 'Results must be interpreted together with each person’s history and clinical condition. Kits do not replace medical assessment.')}</p>
        <h2 className="h2 mt-14 mb-6">{x('Cómo funciona', 'How it works')}</h2>
        <ol className="grid gap-4 md:grid-cols-3">{steps.map(([a, b]: any, i: number) => <li key={a} className="card p-6"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">{i + 1}</span><h3 className="mt-3 text-lg font-medium">{a}</h3><p className="mt-2 text-sm text-on-variant">{b}</p></li>)}</ol>
      </section>
      <CtaBand lang={lang} title={x('¿Cuál kit es para ti?', 'Which kit is right for you?')} text={x('Cuéntanos qué quieres conocer de tu salud y un asesor te recomienda el kit adecuado.', 'Tell us what you want to know about your health and an advisor will recommend the right kit.')} msg={msg} place="kit_cta" />
    </>
  );
}
