/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  extend: {
  colors: {
    mainLightBg: "#FFFFFF",
    mainBlue: "#0F8BFF",
    purpleLightBg: "#F7F1FF",
    babyblueLightBg: "#F3FAFF",
    babyblueLightBgSection: "#F0F7FF",
    headerLightText: "#0F8BFF",
    titleLightText: "#0F8BFF",
    subTitleLightText: "#4c4a54",
    subTitleLightTwoText: "#706E76",
    subTitleLightTextThree:"#575757",
    offWhite: "#F9F9F9",
    blackColor: "#0F0F0F"
  },
  fontSize: {
    hero: "75px",
    title: "18px",
    subtitle: "16px",
    headingSection: "48px",
    small: "14px",
    titleSection: "24px",
    subHeadingSection: "36px"
  },
  spacing: {
    mainPaddingSides: "100px",
    innerPadding: "40px",
    outerPaddingSmall: "20px",
    paddingSections:"120px"
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    fustat: ['Fustat', 'sans-serif'],
    },
  fontWeight:{
    W400: '400',
    W500: '500',
    W600: '600',
    W700: '700',
    },
  backgroundImage: {
        'main-gradient-light': 'linear-gradient(#b5dfff, #d3edff 15.5%, #fff)',
        'main-gradient-light-two': 'linear-gradient(#fff, #d3edff 20%, #b5dfffb3)',
        'main-gradient-cloud': 'linear-gradient(#fff, #adddff 20%, #64bcff)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
