/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4bff0a',
        white: '#eeffe4'
      },
      fontFamily:{
        arvo: ['Arvo', 'sans serif', 'Times New Roman']
      },
      borderRadius: {
        '50p': '50%'
      }
    },
  },
  plugins: [],
}

