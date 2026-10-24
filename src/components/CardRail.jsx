import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '../useCarousel.js';

const ARROW =
  'group flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-paper transition duration-200 hover:bg-ink hover:text-paper active:scale-95 disabled:cursor-not-allowed disabled:border-rule disabled:text-ink-muted/50 disabled:hover:bg-paper disabled:active:scale-100';

// Prev/next pair, rendered in a section header so it never covers the cards.
export function RailArrows({ rail, label }) {
  return (
    <div className="flex shrink-0 items-center gap-3">
      {rail.edges.total > 0 && !(rail.edges.start && rail.edges.end) && (
        <span aria-hidden="true" className="min-w-[3.5rem] text-right text-xs font-medium tabular-nums text-ink-muted">
          {rail.edges.first === rail.edges.last ? rail.edges.first : `${rail.edges.first}\u2013${rail.edges.last}`} / {rail.edges.total}
        </span>
      )}
      <button
        type="button"
        onClick={() => rail.step(-1)}
        disabled={rail.edges.start}
        aria-label={`Previous ${label}`}
        className={ARROW}
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => rail.step(1)}
        disabled={rail.edges.end}
        aria-label={`Next ${label}`}
        className={ARROW}
      >
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>
    </div>
  );
}

// The scrolling list itself. A peek of the next card and a progress thumb
// show there is more to see. `itemClass` sets responsive card widths.
export function RailTrack({ rail, label, itemClass, children }) {
  return (
    <div>
      <ul
        ref={rail.trackRef}
        aria-label={label}
        className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 pt-1 sm:mx-0 sm:scroll-px-0 sm:gap-5 sm:px-0 [@media(pointer:fine)]:cursor-grab"
      >
        {children.map((child, i) => (
          <li key={child.key ?? i} className={`shrink-0 snap-start ${itemClass}`}>
            {child}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className={`mt-4 h-0.5 overflow-hidden rounded-full bg-rule ${rail.edges.start && rail.edges.end ? 'invisible' : ''}`}>
        <span ref={rail.thumbRef} className="block h-full rounded-full bg-ink transition-transform duration-150 ease-out" />
      </div>
    </div>
  );
}

export { useCarousel };
