/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{html,js}',   './components/**/*.{html,js}','./index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms")({
      
      strategy: 'class', // only generate classes
    }),
],
}

