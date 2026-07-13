/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF4E9',
          light: '#FFFCF7',
          dark: '#F0E4D0',
        },
        maroon: {
          DEFAULT: '#5C1A2B',
          light: '#7B2D3F',
          dark: '#3A0F1B',
        },
        gold: {
          DEFAULT: '#C6963B',
          light: '#E4C280',
          dark: '#9C7326',
        },
        blush: {
          DEFAULT: '#EBC6C2',
          light: '#F5DEDB',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Tangerine"', 'cursive'],
        body: ['"Cormorant Garamond"', 'serif'],
        arabic: ['"Amiri"', 'serif'],
      },
      backgroundImage: {
        'gold-line':
          'linear-gradient(90deg, transparent, #C6963B, transparent)',
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(92, 26, 43, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
};
