/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070B14',
        ink2: '#0C1220',
        card: '#121A2C',
        line: '#20304D',
        brand: '#F7A81B',
        cyan: '#25D0EE',
        mint: '#3DDC97',
        mute: '#8A99B5',
      },
      fontFamily: {
        sans: ['"Microsoft JhengHei"', '"PingFang TC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(0,0,0,0.6)',
        glow: '0 0 30px -6px rgba(247,168,27,0.5)',
      },
    },
  },
  plugins: [],
}
