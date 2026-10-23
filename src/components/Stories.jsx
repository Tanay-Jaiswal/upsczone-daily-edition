import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Pause, Play, Video } from 'lucide-react';
import { useUI } from '../context.js';
import { stories, videoSlot } from '../data/stories.js';
import { MAP_VIEWBOX, MAP_RATIO, OUTLINE_PATH, BORDERS_PATH, PLACES } from '../data/indiaMap.js';

const AUTO_ADVANCE_MS = 6000;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Popovers near the map's left or right edge open inwards so they never overflow.
function popoverSide(x) {
  if (x < 32) return 'left-0';
  if (x > 66) return 'right-0';
  return 'left-1/2 -translate-x-1/2';
}

function MapMarker({ story, index, active, onSelect }) {
  const { x, y } = PLACES[story.id];
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-pressed={active}
      aria-label={`${story.persona}, ${story.place}. Sample story ${index + 1} of ${stories.length}`}
      className="group absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:z-30 [@media(hover:hover)]:hover:z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="map-pin relative flex items-center justify-center" style={{ '--i': index }}>
        {story.pulse && <span aria-hidden="true" className="map-pulse absolute inset-0 rounded-full border-2 border-inkblue" />}
        <span
          aria-hidden="true"
          className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold tracking-wide transition duration-200 group-hover:scale-110 ${
            active
              ? 'border-ink bg-inkblue text-white shadow-[0_0_0_4px_#F6D65A]'
              : 'border-ink bg-paper text-ink group-hover:bg-highlighter'
          }`}
        >
          {story.initials}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full mb-1 w-max max-w-[11rem] rounded-lg border border-ink bg-white px-3 py-2 text-left opacity-0 shadow-[3px_3px_0_0_#1C1B19] transition-opacity duration-150 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 ${popoverSide(x)}`}
      >
        <span className="block text-xs font-semibold leading-snug text-ink">{story.persona}</span>
        <span className="mt-0.5 flex items-center gap-1 text-[11px] text-ink-muted">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {story.place} · sample
        </span>
      </span>
    </button>
  );
}

function IndiaMap({ active, onSelect }) {
  return (
    <figure className="relative mx-auto w-full max-w-[520px]">
      <div className="relative" style={{ paddingTop: `${MAP_RATIO * 100}%` }}>
        <svg viewBox={MAP_VIEWBOX} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" focusable="false">
          <path className="map-fill" d={OUTLINE_PATH} fill="#FFFFFF" />
          <path
            className="map-borders"
            d={BORDERS_PATH}
            fill="none"
            stroke="#1F3A93"
            strokeOpacity="0.35"
            strokeWidth="0.9"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="map-outline"
            d={OUTLINE_PATH}
            pathLength="1"
            fill="none"
            stroke="#1C1B19"
            strokeWidth="1.4"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {stories.map((story, i) => (
          <MapMarker key={story.id} story={story} index={i} active={i === active} onSelect={onSelect} />
        ))}
      </div>
      <figcaption className="mt-4 text-center text-[11px] leading-relaxed text-ink-muted">
        Illustrative locations, not user data. Boundaries:{' '}
        <a
          href="https://github.com/datameet/maps"
          className="underline decoration-rule underline-offset-2 hover:text-ink"
          target="_blank"
          rel="noreferrer"
        >
          DataMeet
        </a>{' '}
        (CC BY 4.0), simplified.
      </figcaption>
    </figure>
  );
}

function FeaturedStory({ index, onStep }) {
  const story = stories[index];
  return (
    <div className="rounded-2xl border border-ink bg-paper p-6 shadow-[6px_6px_0_0_#1C1B19] sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="kicker">
          Story {String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
        </p>
        <span className="label-sample">Placeholder</span>
      </div>
      <div aria-live="polite" className="mt-5 min-h-[15rem] sm:min-h-[13rem]">
        <article key={story.id} className="swap-in">
          <span aria-hidden="true" className="block font-serif text-5xl leading-none text-inkblue">
            &ldquo;
          </span>
          <blockquote className="mt-1 font-serif text-xl leading-relaxed lg:text-[1.35rem]">{story.quote}</blockquote>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlighter text-xs font-bold"
            >
              {story.initials}
            </span>
            <p className="text-sm">
              <span className="block font-semibold">{story.persona}</span>
              <span className="flex items-center gap-1 text-ink-muted">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {story.place}
              </span>
            </p>
            <span className="ml-auto rounded-full border border-rule bg-white px-3 py-1 text-xs font-medium">{story.focus}</span>
          </div>
        </article>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-dashed border-rule pt-4">
        <p className="text-xs text-ink-muted">Pick a marker on the map, or step through.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous story"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next story"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Horizontal strip: native scroll-snap (swipe on touch), prev/next buttons, and
// a slow auto-advance on wide screens that pauses on hover, focus or by button.
function useStrip(trackRef) {
  const [edges, setEdges] = useState({ start: true, end: false });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [canAuto, setCanAuto] = useState(false);
  const [inView, setInView] = useState(false);

  const advance = (dir) => {
    const track = trackRef.current;
    const card = track?.querySelector('li');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && atEnd) track.scrollTo({ left: 0, behavior });
    else track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () =>
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      });
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    const wide = window.matchMedia('(min-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncAuto = () => setCanAuto(wide.matches && !reduce.matches);
    syncAuto();
    wide.addEventListener('change', syncAuto);
    reduce.addEventListener('change', syncAuto);

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(track);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      wide.removeEventListener('change', syncAuto);
      reduce.removeEventListener('change', syncAuto);
      io.disconnect();
    };
  }, [trackRef]);

  const running = canAuto && inView && !hovered && !focused && !userPaused;
  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => advance(1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  return {
    edges,
    running,
    // Using the arrows hands control to the reader, so auto-advance stops.
    step: (dir) => {
      setUserPaused(true);
      advance(dir);
    },
    canAuto,
    userPaused,
    togglePause: () => setUserPaused((p) => !p),
    regionProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      },
    },
  };
}

function StripCard({ story, onLocate }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-rule bg-paper p-6 transition duration-200 hover:border-ink">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-rule bg-white px-3 py-1 text-xs font-medium">{story.focus}</span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">Sample</span>
      </div>
      <blockquote className="mt-4 flex-1 font-serif text-[1.05rem] leading-relaxed">{story.quote}</blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-dashed border-rule pt-4">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-highlighter text-[11px] font-bold"
        >
          {story.initials}
        </span>
        <p className="min-w-0 flex-1 text-sm">
          <span className="block font-semibold">{story.persona}</span>
          <span className="text-ink-muted">{story.place}</span>
        </p>
        <button
          type="button"
          onClick={onLocate}
          className="flex shrink-0 items-center gap-1 rounded-full px-2 py-1.5 text-xs font-semibold text-inkblue hover:underline"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          On map
          <span className="sr-only">: {story.persona}, {story.place}</span>
        </button>
      </div>
    </article>
  );
}

function VideoSlot() {
  return (
    <div className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-rule p-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule text-ink-muted">
        <Video className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-serif text-lg font-semibold">A video story could live here</p>
      <p className="mt-1 max-w-[16rem] text-sm text-ink-muted">
        Reserved for a recorded, consented aspirant interview. No video has been made.
      </p>
      <span className="label-sample mt-4">Layout only</span>
    </div>
  );
}

const ITEM_WIDTH = 'w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]';

export default function Stories() {
  const { t } = useUI();
  const [active, setActive] = useState(0);
  const featureRef = useRef(null);
  const mapRef = useRef(null);
  const trackRef = useRef(null);
  const strip = useStrip(trackRef);

  const [lead, rest] = t('stories.title').split(/(?<=[.।])\s+/);

  // On narrow screens the featured card sits below the map: bring it into view after a tap.
  const select = (i) => {
    setActive(i);
    const el = featureRef.current;
    if (!el || window.innerWidth >= 1024) return;
    const r = el.getBoundingClientRect();
    if (r.top < 64 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
    }
  };
  const stepStory = (dir) => setActive((i) => (i + dir + stories.length) % stories.length);
  const locate = (i) => {
    setActive(i);
    mapRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section id="stories" aria-labelledby="stories-title" className="border-y border-rule bg-white/50 py-20 lg:py-28">
      <div className="edition">
        {/* Stage 1: heading */}
        <div data-reveal className="reveal mx-auto max-w-3xl text-center">
          <p className="kicker">{t('stories.kicker')}</p>
          <h2 id="stories-title" className="section-title mt-3">
            <span className="sm:block">{lead}</span>
            {rest && (
              <>
                {' '}
                <span className="marker-static sm:whitespace-nowrap">{rest}</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('stories.sub')}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="label-sample">Sample testimonials (placeholder)</span>
            <span className="label-sample">Illustrative locations</span>
          </div>
        </div>

        {/* Stages 2–4: map draws, markers pop in, featured story follows */}
        <div data-reveal className="stories-stage mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div
            ref={mapRef}
            className="relative rounded-3xl border border-rule bg-paper px-4 pb-5 pt-8 sm:px-10 lg:col-span-7"
            style={{
              backgroundImage: 'radial-gradient(rgba(28,27,25,0.09) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <IndiaMap active={active} onSelect={select} />
          </div>
          <div ref={featureRef} className="reveal-child story-late lg:col-span-5">
            <FeaturedStory index={active} onStep={stepStory} />
          </div>
        </div>

        {/* Stage 5: the strip */}
        <div data-reveal className="reveal mt-16 lg:mt-20" role="region" aria-label="More sample stories" data-auto={strip.running ? 'on' : 'off'} {...strip.regionProps}>
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-serif text-2xl font-semibold">More from the map</h3>
            <div className="flex items-center gap-2">
              {strip.canAuto && (
                <button
                  type="button"
                  onClick={strip.togglePause}
                  aria-label={strip.userPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition hover:text-ink"
                >
                  {strip.userPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => strip.step(-1)}
                disabled={strip.edges.start}
                aria-label="Previous stories"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink sm:flex"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => strip.step(1)}
                aria-label={strip.edges.end ? 'Back to the first story' : 'Next stories'}
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink transition hover:bg-ink hover:text-paper sm:flex"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <ul
            ref={trackRef}
            className="no-scrollbar relative -mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 pt-1 sm:mx-0 sm:scroll-px-0 sm:gap-6 sm:px-0"
          >
            {stories.map((story, i) => (
              <li key={story.id} className={ITEM_WIDTH}>
                <StripCard story={story} onLocate={() => locate(i)} />
              </li>
            ))}
            {videoSlot.enabled && !videoSlot.src && (
              <li className={ITEM_WIDTH}>
                <VideoSlot />
              </li>
            )}
          </ul>
          <p className="mt-2 text-xs text-ink-muted sm:hidden">Swipe for more stories.</p>
        </div>
      </div>
    </section>
  );
}
