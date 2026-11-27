import { I } from './Icon';
import { SITE, waLink, type Lang } from '@/lib/site';
import { T } from '@/lib/i18n';
export function StickyBar({ lang, msg }: { lang: Lang; msg: string }) {
  const t = T(lang);
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 flex gap-2 border-t border-white/10 backdrop-blur-xl" style={{ background: 'var(--hdr)' }}>
      <a href={waLink(msg)} target="_blank" rel="noopener" data-track="whatsapp_click" data-place="sticky_mobile" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full h-12 font-semibold" style={{ background: '#25D366', color: '#0b1f14' }}>
        <I.MessageCircle size={20} aria-hidden /> {t.wa_short}
      </a>
      <a href={`tel:${SITE.tel}`} data-track="call_click" data-place="sticky_mobile" className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-5 bg-surface-high font-medium">
        <I.Phone size={18} aria-hidden /> {t.call_short}
      </a>
    </div>
  );
}
