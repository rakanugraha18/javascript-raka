
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html, js}'],
  theme: {
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#14b8a6',
        dark: '#0f172a',
        secondary: '#64748b',
      },
      screens: {
        '2xl': '1320px',
      },
      fontFamily: {
        Poppins: ['Poppins'],
        Raleway: ['Raleway'],
        Pacifico: ['Pacifico'],
      }, 
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".custom-gradient": {
          backgroundImage: "linear-gradient(to right, #FF9C1B, #9d5c07)",
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}


