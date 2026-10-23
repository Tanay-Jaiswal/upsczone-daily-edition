import { useUI } from '../context.js';
import { testimonials, stats } from '../data/testimonials.js';

export default function Testimonials() {
  const { t } = useUI();
  return (
    <section id="stories" aria-labelledby="stories-title" className="border-y border-rule bg-white/50 py-20 lg:py-28">
      <div className="edition">
        <div data-reveal className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="kicker">{t('stories.kicker')}</p>
            <h2 id="stories-title" className="section-title mt-3">
              {t('stories.title')}
            </h2>
          </div>
          <span className="label-sample self-start sm:self-auto">Sample testimonials (placeholder)</span>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item) => (
            <li key={item.from} data-reveal className="reveal">
              <div className="card-lift flex h-full flex-col rounded-sm border border-rule bg-paper p-6">
              <p className="font-serif text-sm italic text-ink-muted">Dear Editor,</p>
              <blockquote className="mt-3 flex-1 font-serif text-[1.05rem] leading-relaxed">{item.letter}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-dashed border-rule pt-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlighter text-xs font-bold"
                >
                  {item.initials}
                </span>
                <p className="text-sm font-medium">{item.from}</p>
              </div>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="reveal mt-12 rounded-2xl border border-ink">
          <div className="flex items-center justify-between border-b border-ink px-5 py-2">
            <p className="kicker">The edition in numbers</p>
            <span className="label-sample">Illustrative</span>
          </div>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-5 ${i % 2 === 1 ? 'border-l border-rule' : ''} ${i > 1 ? 'border-t border-rule lg:border-t-0' : ''} ${
                  i === 2 ? 'lg:border-l' : ''
                }`}
              >
                <dt className="text-sm text-ink-muted">{s.label}</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
