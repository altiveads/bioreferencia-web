import { I } from './Icon';
import { SITE, waLink, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';

export function WaButton({ lang, msg, label, place, sub = true }: { lang: Lang; msg: string; label?: string; place: string; sub?: boolean }) {
  const t = T(lang);
  return (
    <a href={waLink(msg)} target="_blank" rel="noopener" className="btn-wa" data-track="whatsapp_click" data-place={place}>
      <I.MessageCircle size={24} aria-hidden />
      <span className="flex flex-col items-start leading-tight text-left">
        <span>{label || t.wa}</span>
        {sub && <span className="text-[12px] font-medium opacity-80">{t.online}</span>}
      </span>
    </a>
  );
}
export function CallButton({ lang, place }: { lang: Lang; place: string }) {
  const t = T(lang);
  return (
    <a href={`tel:${SITE.tel}`} className="btn-ghost" data-track="call_click" data-place={place}>
      <I.Phone size={20} className="text-primary" aria-hidden /> {t.call} {SITE.telDisplay}
    </a>
  );
}
export function CtaBand({ lang, title, text, msg, place }: { lang: Lang; title: string; text: string; msg: string; place: string }) {
  return (
    <section className="container-x my-20">
      <div className="card p-8 md:p-14 text-center bg-surface">
        <h2 className="h2">{title}</h2>
        <p className="lead mt-3 max-w-2xl mx-auto">{text}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <WaButton lang={lang} msg={msg} place={place} />
          <CallButton lang={lang} place={place} />
        </div>
      </div>
    </section>
  );
}
