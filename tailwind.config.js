const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./**/*.html"
  ],
  corePlugins: {
    preflight: false,
  },
  darkMode: false, // or 'media' or 'class'
  safeList: [
    'animate-ping',
    'animate-emphasize'
  ],
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
        'emphasize': 'scale-color 1s infinite ease forwards',
      },
      backgroundImage: theme => ({
        'sky': "url('/build/images/sky-background.png')"
      }),
      borderWidth: {
        '1.5': '1.5px' 
      },
      colors: {
        blue: {
          'light': '#73e0ff',
          'twitter': '#00aced'
        },
        pink: {
          DEFAULT: 'rgb(255, 213, 232)'
        },
        magenta: {
          DEFAULT: '#eb00ff'
        }
      },
      fontFamily: {
        'VT323': ['VT323', 'mono']
      },
      keyframes: {
        aqua: {
          from: { 'text-shadow': 'none', color: 'black', transform: 'scale(1.5)' },
          to: { 'text-shadow': '2px 2px aqua', color: '#eb00ff', transform: 'scale(1.5)' }
        },
        'scale-color': {
          '0%': {'transform': 'scale(1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'},
          '50%': {'transform': 'scale(1.1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'},
          '100%': {'transform': 'scale(1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'}
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