/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      fontFamily: {
        bangers: [`var(--font-bangers)`, 'sans-serif'],
        quicksand: [`var(--font-quicksand)`, 'sans-serif'],
        robotoCondensed: [`var(--font-robotoCondensed)`, 'sans-serif'],
      },
      colors: {
        primary: '#d1411e',
        secondary: '#ffa323',
        tertiary: '#331812',
        black: '#231714',
        orange: '#FF7A30',
      },
      backgroundImage: {
        pattern: "url('./assets/img/pattern.png')",
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(3px, 0)',
          },
          '50%': {
            transform: 'translate(-3px, 0)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
      animation: {
        shake: 'shake 150ms 2 linear',
      },
    },
  }
};