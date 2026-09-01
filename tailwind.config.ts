import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette officielle — Charte SphereWeb v2.0 (§2.1)
        navy: {
          DEFAULT: '#050B2B', // Fond principal — bleu profond (aligné portfolio)
          800: '#0A1238', // Surfaces surélevées
          700: '#141D52', // Bordures / survols
        },
        brand: {
          DEFAULT: '#5B3DF6', // Violet-indigo — boutons, liens, titres
          600: '#4c30e0',
          400: '#7b62f8',
        },
        accent: {
          DEFAULT: '#22D3EE', // Cyan électrique — accents, survols, icônes
          600: '#0fb9d4',
        },
        neutraltxt: '#6B7280', // Gris neutre — sous-titres, légendes
        mist: '#F4F5F7', // Gris très clair — sections claires, cartes
        ink: '#1F2937', // Texte courant sur fond clair
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        'draw-in': {
          '0%': { 'stroke-dashoffset': '1' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        blink: 'blink 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
