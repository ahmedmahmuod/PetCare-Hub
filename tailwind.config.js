/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" 
  ],
  theme: {
    extend: {
      colors: {
        'brand-color': 'var(--brand-color)',
        'brand-seconed-color': 'var(--brand-seconed-color)',
        'seconed-color': 'var(--seconed-color)',
        'third-color': 'var(--third-color)',
        'fourth-color': 'var(--fourth-color)',
      },
      fontFamily: {
        cairo: ['var(--font-family)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
