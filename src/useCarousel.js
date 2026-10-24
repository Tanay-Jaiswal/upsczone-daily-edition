import { useCallback, useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Shared behaviour for the horizontal card rails: native scroll-snap for touch
// and trackpads, prev/next stepping exactly one card, mouse drag on desktop, and
// a progress thumb. Vertical page scrolling is never intercepted.
export function useCarousel() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true, first: 1, last: 1, total: 0, active: 0 });

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const start = track.scrollLeft <= 4;
    const end = track.scrollLeft >= max - 4;
    // Which cards are in view: index of the first fully visible card and how many fit.
    const total = track.children.length;
    const card = track.firstElementChild;
    let first = 1;
    let last = Math.min(total, 1);
    let active = 0;
    if (card) {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const unit = card.offsetWidth + gap;
      const perView = Math.max(1, Math.round((track.clientWidth + gap) / unit));
      const idx = Math.min(total - 1, Math.round(track.scrollLeft / unit));
      first = end ? Math.max(1, total - perView + 1) : idx + 1;
      last = Math.min(total, first + perView - 1);
      active = end ? total - 1 : idx;
    }
    setEdges((prev) =>
      prev.start === start && prev.end === end && prev.first === first && prev.last === last && prev.total === total && prev.active === active
        ? prev
        : { start, end, first, last, total, active }
    );
    const thumb = thumbRef.current;
    if (thumb) {
      const ratio = max > 0 ? track.clientWidth / track.scrollWidth : 1;
      const progress = max > 0 ? track.scrollLeft / max : 0;
      thumb.style.width = `${ratio * 100}%`;
      thumb.style.transform = `translateX(${progress * (1 / ratio - 1) * 100}%)`;
    }
  }, []);

  const step = useCallback((dir) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    sync();
    track.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(track);

    // Mouse drag only; touch and pens keep native scrolling.
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let pressed = false;
    const onMove = (e) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) > 5) {
        dragging = true;
        track.style.scrollSnapType = 'none';
        track.style.userSelect = 'none';
        track.style.cursor = 'grabbing';
      }
      if (dragging) track.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      pressed = false;
      if (!dragging) return;
      track.style.scrollSnapType = '';
      track.style.userSelect = '';
      track.style.cursor = '';
      // A drag must not also count as a click on the card underneath.
      const swallow = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      track.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => track.removeEventListener('click', swallow, { capture: true }), 0);
      dragging = false;
    };
    const onDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if (track.scrollWidth <= track.clientWidth) return;
      pressed = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };
    track.addEventListener('pointerdown', onDown);
    // Stops the browser's native image/link drag from hijacking a mouse drag.
    const noNativeDrag = (e) => e.preventDefault();
    track.addEventListener('dragstart', noNativeDrag);

    return () => {
      track.removeEventListener('scroll', sync);
      track.removeEventListener('pointerdown', onDown);
      track.removeEventListener('dragstart', noNativeDrag);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      ro.disconnect();
    };
  }, [sync]);

  return { trackRef, thumbRef, edges, step };
}
