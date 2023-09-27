/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'button': '#D93F3F',
        'rectangleRed': '#DD1A1A',
        'rectangleBlack': '#0C0C0C',
        'rectangleGreey': '#F6F6F6',
        'rectangleGreeyMovs': '#E5E5E5',
        'ellipse': '#212121',
        'textRed': '#FE1936',
        'textBlack': '#302F2F',
        'textGrey': '#D3D3D3',
        'white' : '#FFFFFF',
        'white-rgba': 'rgba(202, 224, 153, 100)',

        /**pokemonColors*/
        'normalBorder': '#735259',
        'normalText': '#735259',
        'fightingBorder': '#96402A',
        'fightingText': '#DD1A1A',
        'flyingBorder': '#e3e3e3',
        'flyingText': '#7E7E7E',
        'poisonBorder': '#5B3184',
        'poisonText': '#5B3184',
        'groundBorder': '#654008',
        'groundText': '#654008',
        'rockBorder': '#7E7E7E',
        'rockText': '#7E7E7E',
        'bugBorder' : '#62DB60',
        'bugText' : '#4AB648',
        'ghostBorder' : '#323569',
        'ghostText' : '#323569',
        'steelBorder': '#5E736C',
        'steelText': '#5E736C',
        'fireBorder': '#E75C35',
        'fireText': '#E75C35',
        'waterBorder': '#1479FB',
        'waterText': '#1479FB',
        'grassBorder': '#ABDAC6',
        'grassText': '#416460',
        'electricBorder': '#0C1395',
        'electricText': '#0C1395',
        'psychicBorder': '#E52D2D',
        'psychicText': '#E52D2D',
        'iceBorder': '#6FBEDF',
        'iceText': '#6FBEDF',
        'dragonBorder': '#478A93',
        'dragonText': '#478A93',
        'darkBorder': '#030706',
        'darkText': '#030706',
        'fairyBorder': '#971B45',
        'fairyText': '#971B45',
      },
      
      borderRadius: {
        '4xl': '2rem',
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      transitionDelay: {
        '2000': '2000ms',
      },
      inset: {
        '1/2': '50%',
      },
      transform: {
        '-translate-x-1/2': '-50%',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans'],
        inter: ['Inter', 'sans'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      custom: [
        'select.custom-select::selection {',
        '  background-color: rectangleRed;', 
        '  color: white;', 
        '}',
      ],

      
      
    },
  },
  plugins: [],
}



