/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6F0',
          200: '#F5EFEB',
          300: '#EBE2D8',
          400: '#DED3C6',
        },
        rose: {
          50: '#FDF7F7',
          100: '#F9ECEC',
          200: '#F3DADB',
          300: '#E8C5C8',
          400: '#DDA7A5',
          500: '#C47C85',
          600: '#B86B75',
        },
        burgundy: {
          500: '#8A2D3A',
          600: '#722F37',
          700: '#5F1E26',
          800: '#4A121A',
          900: '#360911',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A880',
          600: '#B89255',
        },
        charcoal: {
          700: '#4A4240',
          800: '#36302F',
          900: '#231F1F',
        },
        whatsapp: '#25D366',
        whatsappDark: '#1EBE5D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(114, 47, 55, 0.05)',
        'elevated': '0 10px 30px -4px rgba(114, 47, 55, 0.08)',
        'premium': '0 20px 40px -10px rgba(54, 9, 17, 0.12)',
      }
    },
  },
  plugins: [],
}
