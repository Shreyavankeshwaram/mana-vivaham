/* tailwind.config.ts */
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#050505',
        indigo: '#4F46E5',
        purple: '#7C3AED',
        pink: '#EC4899',
        softWhite: '#F5F5F5',
        darkBlue: '#0A0A23',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(124, 58, 237, 0.6)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
