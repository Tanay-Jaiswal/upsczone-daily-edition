import { useEffect, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

// Honest placeholder for every CTA: nothing is saved, nobody is logged in.
export default function ComingSoonModal({ feature, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const open = Boolean(feature);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusables = dialogRef.current.querySelectorAll('button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-scrim/50 dark:bg-scrim/70 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-testid="modal-backdrop"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="soon-title"
        aria-describedby="soon-desc"
        className="relative w-full max-w-md rounded-2xl border border-rule bg-paper p-6 shadow-lift sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 rounded-full p-2 text-ink-muted hover:bg-rule/50 hover:text-ink"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="kicker flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-link" aria-hidden="true" /> Concept preview
        </p>
        <h2 id="soon-title" className="mt-3 font-serif text-2xl font-semibold leading-snug">
          Coming soon in the full product
        </h2>
        <p id="soon-desc" className="mt-3 text-sm leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">{feature}</span> is part of the full UPSC ZONE AI
          experience. This page is a design submission, so no account is created and nothing is
          saved.
        </p>
        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onClose} className="btn-primary">
            Back to the edition
          </button>
        </div>
      </div>
    </div>
  );
}
