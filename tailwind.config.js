/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        klee: ["KleeOne-Regular", "sans-serif"],
      },
      colors: {
        sweetarts: "#d2c98a",
        daddyIssues: "#a66d45",
        sailboatMarina: "#f3ead6",
        donutShop: "#fd9584",
        dutchTulips: "#f6b6a7",
        melonRind: "#a7a155",
      },
    },
  },
  plugins: [],
};
