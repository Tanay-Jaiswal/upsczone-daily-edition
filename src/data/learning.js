// DEMONSTRATION DATA. There is no backend yet: these classes, faculty roles and
// learning paths are written for the design concept. No real teachers, meeting
// links, recordings, prices or lesson counts. Every action opens the coming-soon
// note. Replace `todaysClasses` with an API response of the same shape later.

// status: 'live' | 'upcoming' | 'completed'. `recording` only matters once completed.
export const todaysClasses = [
  {
    id: 'env-hotspots',
    subject: 'Environment',
    title: 'Biodiversity hotspots of India, mapped',
    faculty: 'Environment faculty',
    time: '6:30 AM',
    durationMin: 40,
    level: 'Prelims',
    status: 'completed',
    recording: true,
  },
  {
    id: 'csat-di',
    subject: 'CSAT',
    title: 'Data interpretation: reading tables at speed',
    faculty: 'CSAT faculty',
    time: '7:30 AM',
    durationMin: 45,
    level: 'Beginner',
    status: 'completed',
    recording: false,
  },
  {
    id: 'polity-fr',
    subject: 'Polity · GS II',
    title: 'Fundamental Rights: Articles 14 to 18 in practice',
    faculty: 'Polity faculty',
    time: '9:00 AM',
    durationMin: 60,
    level: 'Prelims + Mains',
    status: 'live',
  },
  {
    id: 'eco-inflation',
    subject: 'Economy · GS III',
    title: 'Inflation basics: CPI, WPI and what each measures',
    faculty: 'Economy faculty',
    time: '11:30 AM',
    durationMin: 50,
    level: 'Beginner',
    status: 'upcoming',
  },
  {
    id: 'geo-monsoon',
    subject: 'Geography · GS I',
    title: 'The monsoon mechanism and Indian agriculture',
    faculty: 'Geography faculty',
    time: '4:00 PM',
    durationMin: 45,
    level: 'Prelims + Mains',
    status: 'upcoming',
  },
  {
    id: 'ethics-case',
    subject: 'Ethics · GS IV',
    title: 'Case studies: structuring a 250-word answer',
    faculty: 'Ethics faculty',
    time: '6:30 PM',
    durationMin: 60,
    level: 'Mains',
    status: 'upcoming',
  },
];

// Learning paths built from the tools this concept already describes
// (mock tests, PYQs, daily edition, notes, answer evaluation, doubt solver).
// No durations, lesson counts or prices: none are verified.
export const learningPaths = [
  {
    id: 'prelims',
    category: 'Prelims',
    icon: 'target',
    title: 'UPSC Prelims',
    blurb: 'Breadth first: topic-wise PYQs and short mock tests that train elimination.',
    includes: ['PYQ Explorer', 'AI Mock Tests', 'Revision notes'],
  },
  {
    id: 'mains',
    category: 'Mains',
    icon: 'pen',
    title: 'UPSC Mains',
    blurb: 'Notes organised by GS paper, with answer practice for each one.',
    includes: ['GS I to IV notes', 'Answer Evaluation', 'Essay themes'],
  },
  {
    id: 'current-affairs',
    category: 'Daily',
    icon: 'news',
    title: 'Current Affairs',
    blurb: 'The daily edition: each story tagged to the syllabus and linked to past questions.',
    includes: ['Daily edition', 'Syllabus tags', 'Weekly recap'],
  },
  {
    id: 'answer-writing',
    category: 'Mains',
    icon: 'notebook',
    title: 'Answer Writing',
    blurb: 'One question a day, with feedback on structure, examples and conclusion.',
    includes: ['Daily question', 'AI feedback', 'Model structures'],
  },
  {
    id: 'csat',
    category: 'Prelims',
    icon: 'calculator',
    title: 'CSAT Preparation',
    blurb: 'Comprehension, reasoning and basic numeracy, practised in short timed sets.',
    includes: ['Timed sets', 'Step-by-step solutions', 'Doubt Solver'],
  },
  {
    id: 'interview',
    category: 'Interview',
    icon: 'chat',
    title: 'Interview Preparation',
    blurb: 'Revisit the issues you followed all year and practise explaining them aloud.',
    includes: ['Issue digests', 'Practice questions', 'Bilingual notes'],
  },
];
