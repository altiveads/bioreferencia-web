'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/site';

const TXT = {
  es: { type: 'Tipo de solicitud', types: ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Felicitación'], client: 'Tipo de cliente', clients: ['Particular', 'Médico', 'Empresa', 'Institución de salud', 'Otro'],
    doc: 'Tipo de documento', docs: ['Cédula de ciudadanía', 'Cédula de extranjería', 'Tarjeta de identidad', 'Pasaporte', 'Permiso por protección temporal', 'NIT', 'Registro civil', 'Otro'], num: 'Número de documento',
    name: 'Nombres', last: 'Apellidos', email: 'Correo electrónico', phone: 'Teléfono / celular', site: 'Sede (opcional)', resp: 'Medio de respuesta preferido', resps: ['Correo electrónico', 'Llamada telefónica', 'WhatsApp'],
    date: 'Fecha del hecho (opcional)', desc: 'Cuéntanos tu caso', descH: 'Describe lo ocurrido con el mayor detalle posible (mínimo 20 caracteres).', terms: 'He leído y acepto la Política de Tratamiento de Datos Personales y autorizo a BioReferencia a usar mi información para gestionar esta solicitud.',
    send: 'Enviar solicitud', sending: 'Enviando…', ok: 'Recibimos tu solicitud', okp: 'Nuestro equipo la revisará y te responderá por el medio que elegiste. Si es urgente, escríbenos por WhatsApp.', err: 'No pudimos enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp.', pick: 'Selecciona…', policy: 'Ver política', other: 'Nueva solicitud' },
  en: { type: 'Request type', types: ['Request', 'Complaint', 'Claim', 'Suggestion', 'Compliment'], client: 'Client type', clients: ['Individual', 'Doctor', 'Company', 'Health institution', 'Other'],
    doc: 'ID type', docs: ['National ID (cédula)', 'Foreigner ID', 'Identity card', 'Passport', 'Temporary protection permit', 'Tax ID (NIT)', 'Birth certificate', 'Other'], num: 'ID number',
    name: 'First name(s)', last: 'Last name(s)', email: 'Email', phone: 'Phone / mobile', site: 'Location (optional)', resp: 'Preferred reply channel', resps: ['Email', 'Phone call', 'WhatsApp'],
    date: 'Date of the event (optional)', desc: 'Tell us what happened', descH: 'Describe what happened in as much detail as you can (at least 20 characters).', terms: 'I have read and accept the Personal Data Policy and authorize BioReferencia to use my information to handle this request.',
    send: 'Send request', sending: 'Sending…', ok: 'We received your request', okp: 'Our team will review it and reply through the channel you chose. If it is urgent, message us on WhatsApp.', err: 'We could not send the form. Try again or message us on WhatsApp.', pick: 'Select…', policy: 'View policy', other: 'New request' },
};
const SITES = ['Belén', 'Ciudad del Río', 'El Tesoro', 'Envigado', 'Rionegro', 'Llanogrande', 'A domicilio', 'Recolección'];

export function PqrsfForm({ lang }: { lang: Lang }) {
  const t = TXT[lang]; const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const field = 'mt-1.5 block w-full rounded-xl border border-outline-variant bg-background/60 px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/15';
  const lab = 'block text-sm font-medium text-on-surface';
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSt('sending');
    const fd = new FormData(e.currentTarget);
    try {
      const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(fd as any).toString() });
      setSt(r.ok ? 'ok' : 'err');
      if (r.ok) (window as any).dataLayer?.push({ event: 'pqrsf_submit', page: location.pathname });
    } catch { setSt('err'); }
  }
  if (st === 'ok') return (
    <div className="card p-8 text-center" role="status">
      <h2 className="h2">{t.ok}</h2><p className="lead mt-3">{t.okp}</p>
      <button type="button" className="btn-ghost mt-6" onClick={() => setSt('idle')}>{t.other}</button>
    </div>
  );
  return (
    <form name="pqrsf" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="card grid gap-5 p-6 md:p-8 md:grid-cols-2">
      <input type="hidden" name="form-name" value="pqrsf" />
      <input type="hidden" name="idioma" value={lang} />
      <p className="hidden"><label>No llenar <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
      <label className={lab}>{t.type} *<select name="tipo_solicitud" required className={field} defaultValue=""><option value="" disabled>{t.pick}</option>{t.types.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className={lab}>{t.client} *<select name="tipo_cliente" required className={field} defaultValue=""><option value="" disabled>{t.pick}</option>{t.clients.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className={lab}>{t.doc} *<select name="tipo_documento" required className={field} defaultValue=""><option value="" disabled>{t.pick}</option>{t.docs.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className={lab}>{t.num} *<input name="numero_documento" required inputMode="numeric" className={field} /></label>
      <label className={lab}>{t.name} *<input name="nombres" required autoComplete="given-name" className={field} /></label>
      <label className={lab}>{t.last} *<input name="apellidos" required autoComplete="family-name" className={field} /></label>
      <label className={lab}>{t.email} *<input name="correo" type="email" required autoComplete="email" className={field} /></label>
      <label className={lab}>{t.phone} *<input name="telefono" type="tel" required autoComplete="tel" className={field} /></label>
      <label className={lab}>{t.site}<select name="sede" className={field} defaultValue=""><option value="">{t.pick}</option>{SITES.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className={lab}>{t.resp} *<select name="medio_respuesta" required className={field} defaultValue=""><option value="" disabled>{t.pick}</option>{t.resps.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className={`${lab} md:col-span-2`}>{t.date}<input name="fecha_hecho" type="date" className={`${field} md:max-w-xs`} /></label>
      <label className={`${lab} md:col-span-2`}>{t.desc} *<textarea name="descripcion" required minLength={20} maxLength={4000} rows={6} className={field} /><span className="mt-1 block text-xs font-normal text-on-variant">{t.descH}</span></label>
      <label className="md:col-span-2 flex items-start gap-3 text-sm text-on-variant"><input type="checkbox" name="acepta_datos" required className="mt-1 h-4 w-4 accent-[rgb(var(--c-primary))]" /><span>{t.terms} <a href="/docs/politicas/proteccion-de-datos-personales.pdf" target="_blank" rel="noopener" className="text-primary underline underline-offset-4">{t.policy}</a></span></label>
      <div className="md:col-span-2">
        <button type="submit" disabled={st === 'sending'} className="btn-wa disabled:opacity-60">{st === 'sending' ? t.sending : t.send}</button>
        {st === 'err' && <p role="alert" className="mt-3 text-sm text-red-400">{t.err}</p>}
      </div>
    </form>
  );
}
