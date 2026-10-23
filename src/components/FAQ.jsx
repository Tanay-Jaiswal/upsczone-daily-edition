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
          <a href="mailto:info@upsczone.in" className="font-semibold text-inkblue underline underline-offset-4">
            info@upsczone.in
          </a>
          .
        </p>
      </div>
      <div className="border-t border-ink lg:col-span-8">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-rule">
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
                  <Plus className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true" />
                </button>
              </h4>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                hidden={!isOpen}
                className="pb-5 pr-10 text-sm leading-relaxed text-ink-muted"
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
