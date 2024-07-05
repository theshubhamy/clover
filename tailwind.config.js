/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF3A8E',
        secondary: '#FFE0ED',
        paper: '#2C272c',
        info: '#A1B0CC',
        whitegray: '#FFFDFF',
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
  corePlugin: {
    backgroundOpacity: true,
    opacity: true,
  },
};
