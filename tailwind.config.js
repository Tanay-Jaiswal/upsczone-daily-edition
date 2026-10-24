/** @type {import('tailwindcss').Config} */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour is a CSS variable (see src/index.css), so one set of
      // utilities serves both themes.
      colors: {
        paper: c('paper'),
        surface: c('surface'),
        ink: c('ink'),
        'ink-muted': c('ink-muted'),
        inkblue: c('inkblue'),
        'inkblue-dark': c('inkblue-dark'),
        link: c('link'),
        highlighter: c('highlighter'),
        'on-highlighter': c('on-highlighter'),
        rule: c('rule'),
        success: c('success'),
        'on-success': c('on-success'),
        error: c('error'),
        live: c('live'),
        band: c('band'),
        'on-band': c('on-band'),
        scrim: c('scrim'),
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        edition: '1200px',
      },
      boxShadow: {
        lift: 'var(--shadow-lift)',
      },
    },
  },
  plugins: [],
};
