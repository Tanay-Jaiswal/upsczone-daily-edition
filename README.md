# UPSC ZONE AI · The Daily Edition

A concept home page for **upsczone.in**, built for the UPSC ZONE AI "Web Home UI Designer Challenge".
Frontend only: no backend, no login, no real API calls.

## Design rationale: "The Daily Edition"

UPSC aspirants already start their day with a newspaper. This page turns that habit into the product
story: the home page *is* a modern daily edition, and every headline on it is visibly mapped to the
GS syllabus, to previous-year questions (PYQs) and to a practice set. Instead of claiming "AI connects
news to your syllabus", the page shows it happening.

- **Visual system.** Warm paper background (`#FAF7F0`), near-black ink, one ink-blue action colour and a
  highlighter yellow used only to mark what matters (key words, GS paper chips). Tokens live in
  `tailwind.config.js`.
- **Typography.** Fraunces for headlines and the masthead (editorial, but contemporary), Inter for UI
  and body text, Noto Sans Devanagari for Hindi.
- **Layout.** 1200px broadsheet grid with thin column rules and double rules, generous whitespace and
  large type, so it reads like a newspaper without looking dated.
- **Signature interaction.** The Syllabus Map: choose a paper and a topic and see one idea travel
  News → Notes → PYQs → Practice.
- **Motion.** A marker sweep behind "your syllabus" on load, gentle card lifts, smooth anchor scrolling.
  All of it is disabled under `prefers-reduced-motion`.

### Sections (in order)

1. Sticky navbar with active-section highlight, EN / हिं toggle, full-screen mobile menu
2. Hero "front page" with today's date and three sample news cards (swipeable strip on mobile)
3. Working 3-question sample quiz with instant feedback and a score
4. Features as newspaper sections: AI Mock Tests, Current Affairs, Smart Notes, PYQ Explorer
   (+ AI Answer Evaluation, AI Doubt Solver, Hindi + English)
5. Interactive Syllabus Map (ARIA tabs: Prelims, GS I–IV, Essay)
6. How it works: Prelims → Mains → Interview journey
7. Stories: "India Is Preparing. One Aspirant at a Time." An India map that draws itself on scroll,
   with placeholder story markers (hover, focus, click or tap), a featured story card, a swipeable
   story strip with gentle auto-advance on desktop, and an empty, layout-only video slot
8. Comparison table ("Why choose the Daily Edition") with three quick FAQ answers below it
9. Final CTA band
10. Footer

## Screenshots

_Add screenshots before submission._

| Desktop | Mobile |
| --- | --- |
| `docs/desktop.png` (placeholder) | `docs/mobile.png` (placeholder) |

## Tech stack

- Vite 5 + React 18 (JavaScript)
- Tailwind CSS 3
- lucide-react icons
- Google Fonts (Fraunces, Inter, Noto Sans Devanagari), loaded with `display=swap`
- No router, no state library, no images: illustrations and previews are CSS/SVG

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Click **Deploy**. Vercel gives you a public `*.vercel.app` URL.

## What is real vs sample

Everything below is **sample or placeholder content** created for this design submission:

| Area | Status |
| --- | --- |
| Hero news cards (`src/data/news.js`) | Sample, neutral explainer headlines written for the concept. Not real reporting. PYQ/practice counts on the cards are placeholders. |
| Sample quiz (`src/data/quiz.js`) | Original questions written for the concept. The quiz logic works; answers were checked against standard references. |
| Syllabus Map (`src/data/syllabus.js`) | Illustrative data. Headlines, notes and PYQ year counts are placeholders, not an analysis of real papers. Labelled "Illustrative data" in the UI. |
| Feature micro-previews (scores, years, notes) | Illustrative visuals only. |
| Stories (`src/data/stories.js`) | Placeholder stories. Not real people or quotes: personas and cities only, with no names, photos, ranks, marks, exam years, ratings or outcomes. Labelled "Sample testimonials (placeholder)" in the UI. |
| Story map markers | Illustrative locations, not user data. Labelled in the UI. |
| Video story slot | Layout only. No video exists; the slot says so. |
| India map (`src/data/indiaMap.js`) | Real geography: [DataMeet India states](https://github.com/datameet/maps) (CC BY 4.0), outer boundary as per the official Survey of India depiction, simplified. The state layer predates 2019, so the J&K / Ladakh UT line is not drawn. See `scripts/map/README.md`. |
| Comparison table (`src/data/compare.js`) | Illustrative, original copy, labelled in the UI. "Typical alternatives" means broad categories (classroom coaching, test series, generic AI chatbots, self-study); no institution is named or assessed, and no rankings or statistics are claimed. |
| FAQ (`src/data/faq.js`) | Describes intended product behaviour; makes no promise of results. |
| All CTAs (Start free, Log in, mock tests, drills, footer links, social icons) | **Non-functional.** Each opens a "Coming soon in the full product" dialog. No account is created and nothing is saved. |
| Social icons | Generic lucide icons, no brand logos. |
| Bilingual toggle | Real: switches navbar, hero, CTAs and section headings between English and Hindi (`src/i18n.js`). Body copy stays in English in this concept. |

All copy, layout and illustrations are original (map boundaries: DataMeet, CC BY 4.0). No templates, stock photos, partner logos or
political content are used.

---

© UPSC ZONE AI · Concept design by Tanay Jaiswal
