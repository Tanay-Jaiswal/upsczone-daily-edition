import { ArrowUpRight } from 'lucide-react';
import { useUI } from '../context.js';

export default function NewsCard({ item, index }) {
  const { openSoon } = useUI();
  return (
    <article className="card-lift group relative flex w-[82%] shrink-0 snap-start flex-col rounded-xl border border-rule bg-white/70 p-5 sm:w-[60%] lg:w-auto">
      <div className="flex items-center justify-between gap-3">
        <span className="chip">
          {item.paper} · {item.topic}
        </span>
        <span className="font-serif text-sm italic text-ink-muted">No. {index + 1}</span>
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold leading-snug sm:text-xl">{item.headline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-rule pt-3">
        <span className="text-xs text-ink-muted">{item.meta}</span>
        <button
          type="button"
          onClick={() => openSoon(`Practice set: ${item.topic}`)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-inkblue underline-offset-4 hover:underline"
        >
          Practise related questions
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
