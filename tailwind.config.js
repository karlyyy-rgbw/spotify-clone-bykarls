/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  
      colors: {  
        customDark1: '#212121', // Custom top color  
        customDark2: '#121212', // Custom bottom color  
        spotifyColor: '#191414',
        mintGreen: '#98FF98'
      },  fontFamily: {  
        signika: ['Signika', 'sans-serif'], // Add the Signika font family  
      },  
  },
  plugins: [],
}}