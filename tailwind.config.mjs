/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1A9FA5',
          50: '#E8F5F6',
          100: '#C5E6E8',
          500: '#1A9FA5',
          600: '#157F84',
          700: '#105F63',
          900: '#0A3438',
        },
        yellow: {
          DEFAULT: '#FBAA19',
          500: '#FBAA19',
        },
        ink: {
          DEFAULT: '#0F1419',
          soft: '#3A4348',
        },
        cream: '#FBF8F3',
        paper: '#FFFFFF',
        border: '#E8E2D5',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        h3: ['1.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        h2: ['1.5rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h1: ['2rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        hero: ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        prose: '68ch',
        container: '1200px',
      },
      letterSpacing: {
        tightest: '-0.025em',
        eyebrow: '0.08em',
      },
    },
  },
  plugins: [],
};
