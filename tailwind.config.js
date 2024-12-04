/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "brice-light": ["Brice Light", "sans-serif"],
        "brice-regular": ["Brice Regular", "sans-serif"],
        "brice-semibold": ["Brice SemiBold", "sans-serif"],
        "brice-black": ["Brice Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
