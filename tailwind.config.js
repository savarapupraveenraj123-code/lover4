/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      colors: {
        ink: '#0a0608',
        burgundy: {
          900: '#1a0510',
          800: '#2a0a1a',
          700: '#3d0e22',
          600: '#5a142d',
          500: '#7a1d3e',
        },
        crimson: {
          600: '#a01428',
          500: '#c41e3a',
          400: '#e0354f',
        },
        rose: {
          400: '#f48fb1',
          300: '#f8bbd0',
          200: '#fce4ec',
        },
        champagne: {
          300: '#e8d5a8',
          200: '#f0e4c3',
          100: '#f7eed8',
        },
      },
      animation: {
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'grain': 'grain 0.5s steps(2) infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '15%': { transform: 'scale(1.15)', opacity: '1' },
          '30%': { transform: 'scale(1)', opacity: '0.9' },
          '45%': { transform: 'scale(1.12)', opacity: '1' },
          '60%': { transform: 'scale(1)', opacity: '0.9' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        grain: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-50%, -50%)' },
        },
      },
    },
  },
  plugins: [],
};
