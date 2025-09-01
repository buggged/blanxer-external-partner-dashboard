/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  darkMode: ['selector', "[data-mantine-color-scheme='dark']"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bpurple: '#883FFF',
        bmagenta: '#E20BC3',
        bpink: '#FF5872',
        bd: 'var(--border-color)',
        bg: 'var(--bg-color)',
        //
        tdim: 'var(--text-dim)',
        dark: {
          50: 'var(--mantine-color-dark-0)',
          100: 'var(--mantine-color-dark-1)',
          200: 'var(--mantine-color-dark-2)',
          300: 'var(--mantine-color-dark-3)',
          400: 'var(--mantine-color-dark-4)',
          500: 'var(--mantine-color-dark-5)',
          600: 'var(--mantine-color-dark-6)',
          700: 'var(--mantine-color-dark-7)',
          800: 'var(--mantine-color-dark-8)',
          900: 'var(--mantine-color-dark-9)',
        },
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        custom: {
          50: 'var(--mantine-primary-color-0)',
          100: 'var(--mantine-primary-color-1)',
          200: 'var(--mantine-primary-color-2)',
          300: 'var(--mantine-primary-color-3)',
          400: 'var(--mantine-primary-color-4)',
          500: 'var(--mantine-primary-color-5)',
          600: 'var(--mantine-primary-color-6)',
          700: 'var(--mantine-primary-color-7)',
          800: 'var(--mantine-primary-color-8)',
          900: 'var(--mantine-primary-color-9)',
        },
      },
      backgroundColor: {},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('mob', '[data-editor-preview="mobile"] &');
    }),
  ],
};
