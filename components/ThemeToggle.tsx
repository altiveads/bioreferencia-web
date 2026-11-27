'use client';
import { useEffect, useState } from 'react';
import { I } from './Icon';

export function ThemeToggle({ labelToLight, labelToDark }: { labelToLight: string; labelToDark: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => { setTheme((document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'); }, []);
  const toggle = () => {
    const n = theme === 'dark' ? 'light' : 'dark';
    setTheme(n); document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('theme', n); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label={theme === 'dark' ? labelToLight : labelToDark} title={theme === 'dark' ? labelToLight : labelToDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-on-surface hover:bg-white/20 transition-colors">
      {theme === 'dark' ? <I.Sun size={18} aria-hidden /> : <I.Moon size={18} aria-hidden />}
    </button>
  );
}
