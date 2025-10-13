/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB100',
        secondary: '#13294B',
        accent: '#2e8b57',
        dark: '#2C1810',
        gray: {
          850: '#374151',
          900: '#1F2937',
        },
      },
      fontFamily: {
        'urbanist': ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}