/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Background: "#292929",
        textColor: "#503ef3",
        textColor2: "#a1a1a1",
        textColor3: "white",
        landingtext: "#da4922",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif", "Montserrat"],
      },
      screens: {
        xs: { max: "410px" }, // ✅ custom breakpoint for ≤410px
      },
    },
  },
  plugins: [],
};
