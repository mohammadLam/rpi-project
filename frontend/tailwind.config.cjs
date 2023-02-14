/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts}', './*.html', './admin/*.html'],
  theme: {
    extend: {
      container: {
        padding: {
          sm: '1rem',
          '2xl': '10rem'
        }
      }
    }
  },
  plugins: []
}
