/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "#000000",
          foreground: "#FFFFFF",
          primary: {
            DEFAULT: "#FFFFFF",
            foreground: "#000000",
          },
          secondary: {
            DEFAULT: "#CCCCCC",
            foreground: "#000000",
          },
          muted: {
            DEFAULT: "#333333",
            foreground: "#FFFFFF",
          },
          accent: {
            DEFAULT: "#666666",
            foreground: "#FFFFFF",
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.scrollbar-hide': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }
        addUtilities(newUtilities)
      },
    ],
    darkMode: 'class',
  }