import { Check, Minus, ArrowRight } from 'lucide-react';
import { useUI } from '../context.js';
import { comparison, alternativesNote } from '../data/compare.js';
import { Wordmark } from './Navbar.jsx';
import FAQ from './FAQ.jsx';

export default function Compare() {
  const { t, openSoon } = useUI();
  const last = comparison.length - 1;

  return (
    <section id="compare" aria-labelledby="compare-title" className="edition py-20 lg:py-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="kicker">{t('compare.kicker')}</p>
          <h2 id="compare-title" className="section-title mt-3">
            {t('compare.title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('compare.sub')}</p>
        </div>
        <span className="label-sample self-start sm:self-auto">Illustrative comparison</span>
      </div>

      {/* Desktop and tablet: a broadsheet-style table with the UPSC ZONE AI column raised */}
      <div className="mt-12 hidden md:block">
        <table className="w-full table-fixed border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            How UPSC ZONE AI compares with typical alternatives on common aspirant questions. Illustrative.
          </caption>
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[32%]" />
            <col className="w-[42%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="double-rule pb-4 pr-6 pt-5 align-bottom">
                <span className="kicker">{t('compare.colQuestion')}</span>
              </th>
              <th scope="col" className="double-rule pb-4 pr-6 pt-5 align-bottom">
                <span className="kicker">{t('compare.colOthers')}</span>
              </th>
              <th scope="col" className="rounded-t-2xl bg-inkblue px-6 pb-4 pt-5 align-bottom text-white">
                <Wordmark className="text-xl [&>span:last-child]:text-ink" />
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.question} className="group">
                <th
                  scope="row"
                  className="border-b border-rule py-6 pr-6 align-top font-serif text-lg font-semibold leading-snug"
                >
                  {row.question}
                </th>
                <td className="border-b border-rule py-6 pr-6 align-top text-sm leading-relaxed text-ink-muted">
                  <span className="flex gap-2.5">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {row.others}
                  </span>
                </td>
                <td
                  className={`border-x-2 border-inkblue bg-white px-6 py-6 align-top transition-colors group-hover:bg-highlighter/20 ${
                    i === last ? 'rounded-b-2xl border-b-2' : 'border-b border-b-rule'
                  }`}
                >
                  <span className="flex gap-2.5 text-sm font-medium leading-relaxed text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                    {row.ours}
                  </span>
                  <span className="mt-2 block pl-6 text-xs text-ink-muted">
                    <span className="bg-highlighter px-1 font-semibold text-ink">{t('compare.why')}:</span> {row.why}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: one card per question */}
      <ol className="mt-10 space-y-4 md:hidden">
        {comparison.map((row, i) => (
          <li key={row.question} className="overflow-hidden rounded-xl border border-rule bg-white">
            <p className="flex gap-3 px-4 pt-4 font-serif text-lg font-semibold leading-snug">
              <span className="font-sans text-xs font-semibold text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
              {row.question}
            </p>
            <div className="mt-3 px-4 pb-4">
              <p className="kicker">{t('compare.colOthers')}</p>
              <p className="mt-1 flex gap-2 text-sm leading-relaxed text-ink-muted">
                <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {row.others}
              </p>
            </div>
            <div className="border-t-2 border-inkblue bg-inkblue/[0.04] px-4 py-4">
              <p className="kicker !text-inkblue">UPSC ZONE AI</p>
              <p className="mt-1 flex gap-2 text-sm font-medium leading-relaxed">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {row.ours}
              </p>
              <p className="mt-2 pl-6 text-xs text-ink-muted">
                <span className="bg-highlighter px-1 font-semibold text-ink">{t('compare.why')}:</span> {row.why}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-ink-muted">
          {alternativesNote} Good teachers and mentors still matter; the edition is built to work alongside them.
        </p>
        <button type="button" onClick={() => openSoon("Today's edition")} className="btn-primary shrink-0 self-start">
          {t('hero.cta')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <FAQ />
    </section>
  );
}
