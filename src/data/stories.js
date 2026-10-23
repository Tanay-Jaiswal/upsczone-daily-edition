// PLACEHOLDER STORIES. Written for this design concept: not real people, not
// real quotes, no names, photos, ranks, marks, years or outcomes. Cities are
// illustrative map placements only. Replace with consented, verified feedback.
// Ordered north to south so keyboard focus moves down the map.
export const stories = [
  {
    id: 'chandigarh',
    place: 'Chandigarh',
    initials: 'EG',
    persona: 'Engineering graduate',
    focus: 'Getting started',
    quote:
      'Coming from engineering, the syllabus felt endless. Seeing today’s news placed against the GS papers made it feel like something with edges.',
  },
  {
    id: 'jaipur',
    place: 'Jaipur',
    initials: 'HM',
    persona: 'Hindi-medium aspirant',
    focus: 'Bilingual notes',
    quote:
      'Switching between Hindi and English on the same note helps me write answers in my medium while still reading the terms used in papers.',
  },
  {
    id: 'lucknow',
    place: 'Lucknow',
    initials: 'FS',
    persona: 'Final-year student',
    focus: 'PYQs',
    quote:
      'The PYQ years next to every topic changed how I revise. I now know which areas keep returning, and I practise those first.',
    pulse: true,
  },
  {
    id: 'patna',
    place: 'Patna',
    initials: 'LS',
    persona: 'Library self-studier',
    focus: 'Syllabus Map',
    quote:
      'I study from one library seat with a pile of newspapers. A single edition that says which part of the syllabus each story belongs to keeps the pile manageable.',
  },
  {
    id: 'guwahati',
    place: 'Guwahati',
    initials: 'SA',
    persona: 'Self-study aspirant',
    focus: 'Planning',
    quote:
      'Coaching is a long way from home. A clear link from each topic to its past questions gives me a sense of direction without having to travel.',
    pulse: true,
  },
  {
    id: 'bhubaneswar',
    place: 'Bhubaneswar',
    initials: 'RA',
    persona: 'Repeat attempt',
    focus: 'Daily tests',
    quote:
      'Short daily tests feel less scary than a full mock. The explanation after each answer is where most of my learning happens.',
  },
  {
    id: 'pune',
    place: 'Pune',
    initials: 'WP',
    persona: 'Working professional',
    focus: 'Current affairs',
    quote:
      'I get forty minutes on the metro and nothing more. Seeing each news item already tagged to a GS paper means I stop wondering whether it is worth reading.',
  },
  {
    id: 'kochi',
    place: 'Kochi',
    initials: 'AW',
    persona: 'Mains answer-writer',
    focus: 'Answer writing',
    quote:
      'I write one answer every evening. Notes organised by GS paper mean I know where each example will be useful later.',
    pulse: true,
  },
];

// Layout-only slot for a future video story. Leave src empty until a real,
// consented recording exists; the UI then shows a clearly marked placeholder.
export const videoSlot = { enabled: true, src: null };
