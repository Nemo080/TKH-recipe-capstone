/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Adjust paths as necessary
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
