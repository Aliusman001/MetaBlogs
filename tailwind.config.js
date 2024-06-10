/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work-Sans", "sans-serif"],
      },
      screens: {
        md: "875px", // Change this value if you need a different breakpoint for md
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
