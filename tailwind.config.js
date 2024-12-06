/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        dark: '#065A44',
        light: '#5ECF9F'
      },
    },
  },
  plugins: [],
}

