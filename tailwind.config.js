const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./**/*.html"
  ],
  corePlugins: {
    preflight: false,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '16rem': '16rem',
    },
    zIndex: {
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
      '-1': -1,
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 300ms ease-in forwards',
        'fade-out': 'fadeOut 300ms ease-out forwards',
        'fade-out-delay': 'fadeOut 300ms ease-out 300ms forwards',
        'pop-in': 'popIn 300ms ease-out',
        'pop-out': 'popOut 300ms ease-in',
        'rotate-in': 'rotateIn 600ms ease-in-out forwards',
        'rotate-out': 'rotateOut 600ms ease-in-out forwards',
      },
      backgroundImage: theme => ({
        'sky': "url('/build/images/sky-background.png')"
      }),
      colors: {
        blue: {
          'light': '#73e0ff'
        },
        pink: {
          'light': 'rgba(255, 213, 232, 0.67)'
        }
      },
      fontFamily: {
        'VT323': ['VT323', 'mono']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '100%' },
        },
        fadeOut: {
          '0%': { opacity: '100%' },
          '100%': { opacity: '0' },
        },
        popIn: {
          from: {opacity: '0', transform: 'scale(.95)'},
          to: {opacity: '100%', transform: 'scale(1)'}
        },
        popOut: {
          from: {opacity: '100%', transform: 'scale(1)'},
          to: {opacity: '0', transform: 'scale(.95)'}
        },
        rotateIn: {
          '0%': { transform: 'rotateY(90deg)' },
          '50%': { transform: 'scale(1.05)'},
          '80%': { transform: 'rotateY(-10deg) scale(1)' },
          '100%': { transform: 'rotateY(0)' },
        },
        rotateOut: {
          '0%': { transform: 'rotateY(0)' },
          '20%': { transform: 'rotateY(-10deg) scale(1)' },
          '50%': { transform: 'scale(1.05)'},
          '100%': { transform: 'rotateY(90deg)' },
        }
      },
    }
  },
}