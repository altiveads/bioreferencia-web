'use client';
import { useEffect } from 'react';
// Marca cards, títulos y detalles como [data-reveal] y los muestra al entrar en pantalla. Respeta prefers-reduced-motion.
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement; const sel = 'main h2, main .card:not(.nr), main details, main .reveal-me';
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const mark = () => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.hasAttribute('data-reveal') || el.closest('.hero-in, .story') || el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
        const sib = Array.from(el.parentElement?.children || []).indexOf(el);
        el.style.setProperty('--d', `${Math.min(sib, 6) * 70}ms`); el.setAttribute('data-reveal', ''); io.observe(el);
      });
    };
    root.classList.add('js'); mark();
    const t = setTimeout(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in')), 4000); // red de seguridad
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return null;
}
