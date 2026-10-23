/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF7F0',
        ink: '#1C1B19',
        'ink-muted': '#57534A',
        inkblue: '#1F3A93',
        'inkblue-dark': '#172C70',
        highlighter: '#F6D65A',
        rule: '#D9D4C7',
        success: '#2E7D4F',
        error: '#B3261E',
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
        lift: '0 12px 24px -12px rgba(28, 27, 25, 0.25)',
      },
    },
  },
  plugins: [],
};
