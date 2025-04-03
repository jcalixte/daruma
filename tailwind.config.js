/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    'border-red-500',
    'border-blue-500',
    'border-green-500',
    'border-gold-500',
    'border-purple-500'
  ],
  plugins: [],
};