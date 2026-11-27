'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { I } from './Icon';

type Row = [string, string, string, number, string];
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function ExamSearch({ lang, compact = false, labels }: { lang: 'es' | 'en'; compact?: boolean; labels: { search: string; all: string; area: string; results: string; none: string; more: string } }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState('');
  const [area, setArea] = useState('');
  const [n, setN] = useState(compact ? 6 : 24);
  useEffect(() => { fetch('/data/examenes-index.json').then((r) => r.json()).then(setRows).catch(() => {}); }, []);
  const areas = useMemo(() => Array.from(new Set(rows.map((r) => r[2]))).sort((a, b) => a.localeCompare(b, 'es')), [rows]);
  const list = useMemo(() => {
    const k = norm(q.trim());
    return rows.filter((r) => (!area || r[2] === area) && (!k || norm(r[1] + ' ' + r[4]).includes(k)))
      .sort((a, b) => (b[3] - a[3]) || a[1].localeCompare(b[1], 'es'));
  }, [rows, q, area]);
  const p = lang === 'en' ? '/en' : '';
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3">
        <label className="relative flex-1">
          <span className="sr-only">{labels.search}</span>
          <I.Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" aria-hidden />
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setN(compact ? 6 : 24); }} placeholder={labels.search}
            className="w-full h-14 rounded-full bg-surface-high/80 pl-12 pr-5 text-on-surface placeholder:text-on-variant outline-none focus-visible:ring-2 ring-primary" />
        </label>
        {!compact && (
          <label>
            <span className="sr-only">{labels.area}</span>
            <select value={area} onChange={(e) => { setArea(e.target.value); setN(24); }} className="h-14 w-full md:w-72 rounded-full bg-surface-high/80 px-5 text-on-surface">
              <option value="">{labels.all}</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </label>
        )}
      </div>
      {!compact && <p className="mt-3 text-sm text-on-variant" aria-live="polite">{list.length.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US')} {labels.results}</p>}
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, n).map((r) => (
          <li key={r[0]}>
            <Link href={`${p}/examenes/${r[0]}/`} className="card nr flex h-full flex-col justify-between gap-2 p-5 hover:border-primary/60 transition-colors">
              <span className="font-medium leading-snug">{r[1]}</span>
              <span className="text-xs text-primary">{r[2]}</span>
            </Link>
          </li>
        ))}
      </ul>
      {rows.length > 0 && list.length === 0 && <p className="mt-6 text-on-variant">{labels.none}</p>}
      {list.length > n && <button type="button" onClick={() => setN(n + 24)} className="btn-ghost mt-6">{labels.more}</button>}
    </div>
  );
}
