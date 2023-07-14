/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        'bruno-ace': ['Bruno Ace', 'cursive'],
        monoton: ['Monoton', 'cursive'],
      },
      colors: {
        primaryGreen: {DEFAULT: '#6BFF2D'},
      },
      backgroundImage: {
        'screen-texture': "url('./assets/texture.jpg')",
      },
    },
  },
  plugins: [],
};
