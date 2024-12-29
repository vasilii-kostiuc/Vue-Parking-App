/* eslint-env node */
/** @type {import('tailwindcss').Config} */
 
//const colors = require("tailwindcss/colors");

import colors from 'tailwindcss/colors'
module.exports = {
  content: ["./src/**/*.{vue,js}"],
  theme: {
    extend: { colors },
  },
  plugins: [],
};