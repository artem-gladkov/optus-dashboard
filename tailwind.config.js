/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'form': '#161223',
      'active': '#2C2445',
      'inActive': '#6A637A',
      'bg': '#100C1B',
      'text': '#D8D3E3',
      'numberRed': '#e51919',
      'numberGreen': '#0a9608',
      'headerActiveBTN': '#2C2445',
      'transparent': 'transparent',
      'blue': '#622ffa',
    }
  },
  plugins: [],
}
