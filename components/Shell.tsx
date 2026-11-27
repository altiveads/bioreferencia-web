import { Header } from './Header';
import { Footer } from './Footer';
import { StickyBar } from './StickyBar';
import { Tracker } from './Tracker';
import { Reveal } from './Reveal';
import { T } from '@/lib/i18n';
import type { Lang } from '@/lib/site';

export function Shell({ lang, path, stickyMsg, children }: { lang: Lang; path: string; stickyMsg: string; children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary">{T(lang).skip}</a>
      <Header lang={lang} path={path} />
      <main id="main" className="pt-20">{children}</main>
      <Footer lang={lang} />
      <StickyBar lang={lang} msg={stickyMsg} />
      <Tracker />
      <Reveal />
    </>
  );
}
