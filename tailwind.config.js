/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desagreen: {
          DEFAULT: "#0A4532",
          dark: "#063023",
          light: "#0E5A42",
          surface: "#0A4532",
        },
        desacream: {
          DEFAULT: "#FFE7D2",
          light: "#FFF3E8",
          dark: "#E8CDBA",
        },
        desagold: "#D4AF37",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
};
