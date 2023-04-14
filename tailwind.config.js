/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: { maxHeight: { 128: '40rem' },
      width: { 86: '22.5rem' },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      pacifico: ['Pacifico', 'cursive'],
    },
  },
  plugins: [],
};
