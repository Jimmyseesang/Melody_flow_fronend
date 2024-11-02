/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinky: {
          100: '#ffa6fc',
          200: '#ffa8b7',
          300: '#ff76d8',
          400: '#fc68dc',
          500: '#ff59c7',
        },
        black: {
          100: '#111111',
          200: '#262626',
        },
      },
      fontFamily: {
        supakan: ["Oxanium", "sans-serif"]
      },
      flex: {
        '2' : '1 0 100%'
      },
      keyframes: {
        bubble : {
          'from': {bottom: '-1000px'},
          'to': {top: '-1000px'}
        },
        spin: {
          'from' : {transform: 'rotate(0deg)'},
          'to' : {transform: 'rotate(360deg)'}
        }
      },
      animation: {
        bubble: 'bubble 30s infinite',
        spin: 'spin 30s linear infinite'
      }

    },
  },
  plugins: [],
}
