/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#edfbee',
          100: '#d4f7d6',
          200: '#aaeead',
          300: '#72e077',
          400: '#3cc941',
          500: '#2ecc40',
          600: '#22a832',
          700: '#1c8629',
          800: '#196923',
          900: '#16561e',
        },
      },
    },
  },
  plugins: [],
};
