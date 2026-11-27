import { I } from './Icon';
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="card group px-6 py-4 open:bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-lg [&::-webkit-details-marker]:hidden">
            {f.q}<I.ChevronDown size={20} className="shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 text-on-variant leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
