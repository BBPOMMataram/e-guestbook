/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      'bpom': {
        g: '#0BAB62',
        b: '#3E4095',
        m: '#fef08a'
      }
    },
    fontFamily: {
      'roboto': ['Roboto Mono'],
      'island-moment': ['Island Moments', 'cursive']
    }
  },
  },
  plugins: [],
  darkMode: 'class'
}
