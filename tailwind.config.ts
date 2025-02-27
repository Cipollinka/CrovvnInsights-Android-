/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/screens/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/components/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: '#292100',
        primary: '#624F00',
        secondary: '#816801',
        'secondary-50': '#FFD000',
        text: '#FBC000',
        red: '#FF0000',
        'white-50': '#ffffff80',
        'white-20': '#ffffff40',
      },
    },
  },
  plugins: [],
};
