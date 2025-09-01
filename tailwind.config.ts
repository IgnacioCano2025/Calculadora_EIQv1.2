import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        edra: {
          primary: '#0A84FF',
          secondary: '#0ED1C1',
          accent: '#0F172A',
          surface: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Arial']
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: [],
} satisfies Config
