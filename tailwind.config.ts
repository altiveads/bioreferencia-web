import type { Config } from 'tailwindcss';
const c = (n: string) => `rgb(var(--c-${n}) / <alpha-value>)`;
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: c('bg'), 'surface-lowest': c('lowest'), 'surface-low': c('low'), surface: c('container'),
        'surface-high': c('high'), 'surface-highest': c('highest'),
        'on-surface': c('on'), 'on-variant': c('onv'), outline: c('outline'), 'outline-variant': c('outlinev'),
        primary: c('primary'), 'on-primary': c('onprimary'), 'primary-container': c('primaryc'),
        secondary: c('secondary'), tertiary: c('tertiary'),
      },
      fontFamily: { sans: ['"Outfit Variable"', 'Outfit', 'system-ui', 'sans-serif'] },
      borderRadius: { DEFAULT: '1rem', lg: '2rem', xl: '3rem' },
    },
  },
  plugins: [],
} satisfies Config;
