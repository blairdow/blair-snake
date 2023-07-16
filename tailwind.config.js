const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./**/*.html",
    "./src/**/main.js"
  ],
  corePlugins: {
    preflight: false,
  },
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
        'emphasize': 'scale-color 1s infinite ease',
        'fade-in': 'fade-in 1s',
        'fade-out': 'fade-out 1s forwards'
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
      justifySelf: {
        'left': 'left'
      },
      keyframes: {
        'fade-in': {
          from: { 'opacity': 0 },
          to: { 'opacity': 1 }
        },
        'fade-out': {
          from: { 'opacity': 1 },
          to: { 'opacity': 0 }
        },
        'scale-color': {
          '0%': {'transform': 'scale(1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'},
          '50%': {'transform': 'scale(1.1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'},
          '100%': {'transform': 'scale(1)', 'color': '#eb00ff', 'text-shadow':'2px 2px aqua'}
        },
      },
    }
  },
}