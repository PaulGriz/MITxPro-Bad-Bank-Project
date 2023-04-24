/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],

  theme: {
    screens: {
      mobile: "680px",
      tablet: "800px",
      desktop: "900px",
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
