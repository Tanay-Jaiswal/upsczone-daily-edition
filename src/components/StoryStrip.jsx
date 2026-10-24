import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// px per second. Slow enough to read a card as it passes.
const SPEED = 26;
const STEP_MS = 760;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeInOut = (p) => 0.5 - Math.cos(Math.PI * p) / 2;

// A calm editorial marquee. The cards travel LEFT TO RIGHT.
//
// The track holds the real list plus aria-hidden, inert copies, so the sequence
// can wrap without a seam. One requestAnimationFrame loop moves a single
// translateX straight on the DOM node (no React state per frame). The loop only
// runs while the strip is visible and not paused, hovered, focused or dragged.
// Arrows and drag feed the same offset, so they never fight the flow.
export default function StripMarquee({ children, label, resumeLabel, pauseLabel, prevLabel, nextLabel, heading, hint }) {
  const items = Children.toArray(children);
  const marquee = items.length >= 3;

  const viewRef = useRef(null);
  const moverRef = useRef(null);
  const realRef = useRef(null);
  const [copies, setCopies] = useState(3);
  const [userPaused, setUserPaused] = useState(false);
  const [canFlow, setCanFlow] = useState(true);

  // Everything the loop reads lives in one ref, so no frame touches React.
  const s = useRef({
    phase: 0, // position in the repeating sequence: 0 up to 1 is one full cycle
    width: 0, // pixel width of one copy
    tween: null,
    drag: false,
    hover: false,
    focus: false,
    visible: false,
    user: false,
    flow: true,
    raf: 0,
    last: 0,
  });

  const paint = useCallback(() => {
    const st = s.current;
    if (!moverRef.current || !st.width) return;
    // phase 0 shows the real list at the left edge; moving right brings earlier cards in.
    moverRef.current.style.transform = `translate3d(${(st.phase - 1) * st.width}px,0,0)`;
  }, []);

  const wrap = (st) => {
    if (st.phase >= 1) st.phase -= Math.floor(st.phase);
    else if (st.phase < -1) st.phase += Math.ceil(-st.phase) - 1;
  };

  const running = () => {
    const st = s.current;
    return st.flow && st.visible && !st.user && !st.hover && !st.focus && !st.drag;
  };

  const tick = useCallback(
    (now) => {
      const st = s.current;
      st.raf = 0;
      const dt = Math.min(0.05, (now - st.last) / 1000);
      st.last = now;
      if (st.width) {
        if (running()) st.phase += (SPEED * dt) / st.width;
        if (st.tween) {
          const p = Math.min(1, (now - st.tween.t0) / STEP_MS);
          const e = easeInOut(p);
          st.phase += st.tween.delta * (e - st.tween.done);
          st.tween.done = e;
          if (p >= 1) st.tween = null;
        }
        wrap(st);
        paint();
      }
      if (running() || st.tween) st.raf = requestAnimationFrame(tick);
    },
    [paint]
  );

  const kick = useCallback(() => {
    const st = s.current;
    if (st.raf || !marquee) return;
    st.last = performance.now();
    st.raf = requestAnimationFrame(tick);
  }, [marquee, tick]);

  // Moves the sequence by `px` (positive = cards move right).
  const nudge = useCallback(
    (px) => {
      const st = s.current;
      if (!st.width) return;
      const delta = px / st.width;
      if (prefersReducedMotion()) {
        st.phase += delta;
        wrap(st);
        paint();
        return;
      }
      const rest = st.tween ? st.tween.delta * (1 - st.tween.done) : 0;
      st.tween = { t0: performance.now(), delta: delta + rest, done: 0 };
      kick();
    },
    [kick, paint]
  );

  const stepSize = () => {
    const li = realRef.current?.firstElementChild;
    if (!li) return 0;
    const gap = parseFloat(getComputedStyle(realRef.current).columnGap) || 0;
    return li.offsetWidth + gap;
  };

  // Measure the copy width and decide how many copies cover the window.
  useLayoutEffect(() => {
    if (!marquee) return undefined;
    const view = viewRef.current;
    const measure = () => {
      const st = s.current;
      const w = realRef.current.offsetWidth;
      const v = view.clientWidth;
      if (!w || !v) return;
      st.width = w;
      // The window must always sit inside the copies: copies * w - v >= 2w.
      const need = Math.max(3, Math.ceil(2 + v / w));
      setCopies((c) => (c === need ? c : need));
      paint();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(view);
    ro.observe(realRef.current);
    return () => ro.disconnect();
  }, [marquee, paint]);

  useEffect(() => {
    if (!marquee) return undefined;
    const view = viewRef.current;
    const st = s.current;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncFlow = () => {
      st.flow = !reduce.matches;
      setCanFlow(st.flow);
      kick();
    };
    syncFlow();
    reduce.addEventListener('change', syncFlow);

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
      if (st.visible) kick();
    });
    io.observe(view);

    // The window must never scroll natively (focus can try to); the offset is the only position.
    const noScroll = () => {
      view.scrollLeft = 0;
    };
    view.addEventListener('scroll', noScroll);

    // Mouse hover pauses; touch has no hover, so it is ignored here.
    const onEnter = (e) => {
      if (e.pointerType === 'mouse') st.hover = true;
    };
    const onLeave = (e) => {
      if (e.pointerType !== 'mouse') return;
      st.hover = false;
      kick();
    };
    const region = view.parentElement;
    region.addEventListener('pointerenter', onEnter);
    region.addEventListener('pointerleave', onLeave);

    const onFocusIn = (e) => {
      // Only keyboard focus pauses; a mouse click on a button should not leave the strip stuck.
      if (!e.target.matches?.(':focus-visible')) return;
      st.focus = true;
      // The browser may have scrolled the window to show the focused control; undo that, then move the sequence instead.
      view.scrollLeft = 0;
      // Bring a focused real card into view without a jump.
      const card = e.target.closest('li');
      if (card && realRef.current.contains(card)) {
        const vr = view.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        const pad = 16;
        if (cr.left < vr.left + pad) nudge(vr.left + pad - cr.left);
        else if (cr.right > vr.right - pad) nudge(vr.right - pad - cr.right);
      }
    };
    const onFocusOut = (e) => {
      if (region.contains(e.relatedTarget)) return;
      st.focus = false;
      kick();
    };
    region.addEventListener('focusin', onFocusIn);
    region.addEventListener('focusout', onFocusOut);

    // Drag with a mouse, or swipe sideways on touch. Vertical swipes still scroll the page.
    let startX = 0;
    let startPhase = 0;
    let pressed = false;
    let moved = false;
    const onDown = (e) => {
      if (e.button !== 0 || !st.width) return;
      pressed = true;
      moved = false;
      startX = e.clientX;
      startPhase = st.phase;
      st.tween = null;
    };
    const onMove = (e) => {
      if (!pressed) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        st.drag = true;
        view.setPointerCapture?.(e.pointerId);
        view.style.cursor = 'grabbing';
      }
      if (moved) {
        st.phase = startPhase + dx / st.width;
        wrap(st);
        paint();
      }
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      view.style.cursor = '';
      if (!moved) return;
      st.drag = false;
      // A drag must not also count as a click on the card underneath.
      const swallow = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      };
      view.addEventListener('click', swallow, { capture: true, once: true });
      setTimeout(() => view.removeEventListener('click', swallow, { capture: true }), 0);
      kick();
    };
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', onUp);
    view.addEventListener('pointercancel', onUp);
    const noNativeDrag = (e) => e.preventDefault();
    view.addEventListener('dragstart', noNativeDrag);

    return () => {
      cancelAnimationFrame(st.raf);
      st.raf = 0;
      reduce.removeEventListener('change', syncFlow);
      io.disconnect();
      view.removeEventListener('scroll', noScroll);
      region.removeEventListener('pointerenter', onEnter);
      region.removeEventListener('pointerleave', onLeave);
      region.removeEventListener('focusin', onFocusIn);
      region.removeEventListener('focusout', onFocusOut);
      view.removeEventListener('pointerdown', onDown);
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', onUp);
      view.removeEventListener('pointercancel', onUp);
      view.removeEventListener('dragstart', noNativeDrag);
    };
  }, [marquee, kick, nudge, paint]);

  const togglePause = () => {
    const st = s.current;
    st.user = !st.user;
    setUserPaused(st.user);
    kick();
  };

  // Too few cards for a seamless loop: a plain swipeable row, no copies and no motion.
  if (!marquee) {
    return (
      <div role="region" aria-label={label}>
        <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-1 sm:mx-0 sm:gap-6 sm:px-0">
          {items.map((item) => (
            <li key={item.key} className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const cards = items.map((item, i) => (
    <li
      key={item.key ?? i}
      className="w-[84cqw] shrink-0 sm:w-[calc((100cqw-1.5rem)/2.15)] lg:w-[calc((100cqw-3rem)/3.15)]"
    >
      {item}
    </li>
  ));
  const listClass = 'flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6';

  return (
    <div role="region" aria-label={label} data-flow={canFlow && !userPaused ? 'on' : 'off'}>
      <div className="flex items-end justify-between gap-4">
        {heading}
        <div className="flex items-center gap-2">
          {canFlow && (
            <button
              type="button"
              onClick={togglePause}
              aria-label={userPaused ? resumeLabel : pauseLabel}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition hover:text-ink"
            >
              {userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            onClick={() => nudge(-stepSize())}
            aria-label={prevLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper [&>svg]:transition-transform hover:[&>svg]:-translate-x-0.5"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(stepSize())}
            aria-label={nextLabel}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={viewRef}
        data-strip
        className="strip-view -mx-4 -my-3 mt-1 overflow-hidden py-6 [container-type:inline-size] sm:mx-0"
        style={{ touchAction: 'pan-y' }}
      >
        <div ref={moverRef} className="ml-4 flex w-max will-change-transform sm:ml-0">
          {Array.from({ length: copies }, (_, c) =>
            c === 1 ? (
              <ul key={c} ref={realRef} className={listClass} aria-label={label}>
                {cards}
              </ul>
            ) : (
              <div key={c} aria-hidden="true" inert="">
                <ul className={listClass}>{cards}</ul>
              </div>
            )
          )}
        </div>
      </div>
      <p className="text-xs text-ink-muted sm:hidden">{hint}</p>
    </div>
  );
}
