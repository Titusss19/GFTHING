/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Pink / Rose palette ── */
        sunflower: {
          light: '#F8BBD0',
          DEFAULT: '#E8546D',
          dark: '#D81B60',
          deep: '#AD1457',
        },
        cream: {
          50: '#FFFAFE',
          100: '#FFF5F8',
          200: '#FFF0F5',
          300: '#FFE4ED',
          dark: '#FFD6E0',
        },
        sage: {
          light: '#F0B8CB',
          DEFAULT: '#CE93A8',
          dark: '#B07090',
          deep: '#8E4E6E',
        },
        warmBrown: {
          light: '#A16B7F',
          DEFAULT: '#7B435B',
          dark: '#5D2E46',
          deep: '#3D1C2E',
        },
        blush: {
          light: '#FFF5F7',
          DEFAULT: '#FFD1DC',
          dark: '#FFB6C1',
          rose: '#FF8FA3',
        },
        kraft: {
          light: '#E8B4C0',
          DEFAULT: '#D4949F',
          dark: '#B07080',
        }
      },
      fontFamily: {
        script: ['"Dancing Script"', '"Caveat"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Nunito"', 'sans-serif'],
      },
      boxShadow: {
        'polaroid': '0 10px 25px -5px rgba(123,67,91,0.15), 0 8px 10px -6px rgba(123,67,91,0.1)',
        'polaroid-lg': '0 20px 35px -10px rgba(123,67,91,0.25), 0 10px 15px -8px rgba(123,67,91,0.15)',
        'warm-glow': '0 0 25px rgba(232,84,109,0.4)',
        'box-shadow': '0 25px 50px -12px rgba(93,46,70,0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        'gentle-sway': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        shimmer: {
          '0%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
          '100%': { opacity: '0.4' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'sway': 'gentle-sway 5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
