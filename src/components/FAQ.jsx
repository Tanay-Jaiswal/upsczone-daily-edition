import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUI } from '../context.js';
import { faq } from '../data/faq.js';

// Compact accordion that sits under the comparison table.
export default function FAQ() {
  const { t } = useUI();
  const [open, setOpen] = useState(-1);
  return (
    <div data-reveal className="reveal mt-16 grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <h3 className="font-serif text-2xl font-semibold">{t('faq.title')}</h3>
        <p className="mt-2 text-sm text-ink-muted">
          Still unsure? Write to{' '}
          <a href="mailto:info@upsczone.in" className="font-semibold text-link underline underline-offset-4">
            info@upsczone.in
          </a>
          .
        </p>
      </div>
      <div className="space-y-3 lg:col-span-8">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="rounded-xl border border-rule bg-surface px-5 shadow-card">
              <h4>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-4 text-left font-semibold"
                >
                  {item.q}
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen ? 'border-ink bg-ink text-paper' : 'border-rule text-ink'
                    }`}
                  >
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </span>
                </button>
              </h4>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                hidden={!isOpen}
                className="pb-5 pr-9 text-sm leading-relaxed text-ink-muted"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
