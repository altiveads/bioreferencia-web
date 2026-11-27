'use client';
import { useEffect } from 'react';
export function Tracker() {
  useEffect(() => {
    const w = window as any; w.dataLayer = w.dataLayer || [];
    const h = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('[data-track]') as HTMLElement | null; if (!a) return;
      w.dataLayer.push({ event: a.dataset.track, place: a.dataset.place || '', page: location.pathname });
    };
    document.addEventListener('click', h); return () => document.removeEventListener('click', h);
  }, []);
  return null;
}
