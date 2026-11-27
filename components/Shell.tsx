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
      <Header lang={lang} path={path} />
      <main id="main" className="pt-20">{children}</main>
      <Footer lang={lang} />
      <StickyBar lang={lang} msg={stickyMsg} />
      <Tracker />
      <Reveal />
    </>
  );
}
