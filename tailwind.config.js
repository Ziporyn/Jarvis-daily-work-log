/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        card: 'rgba(15, 23, 42, 0.6)',
        primary: '#3b82f6',
        'primary-dark': '#1e40af',
        text: {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
          muted: '#64748b',
          light: '#94a3b8'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 40%, #050508 100%)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Noto Sans SC"', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in ease-out'
      }
    },
  },
  plugins: [],
}
