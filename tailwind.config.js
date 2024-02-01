/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "grey-dark": "#202226",
      "grey-mid-1": "#2F3135",
      "grey-mid-2": "#363A3F",
      "grey-light": "#E9E9F0",
      "purple-dark": "#6F21E6",
      "purple-light": "#9E5EFF",
      "blue-light": "#48cbff",
      "blue-mid": "#0080ff",
      "purple-mid": "#4a5fe3",
      "violet-mid": "#8b42cb",
      "pink-mid": "#c428b6",
      "blue-half": "rgba(0,128,255,0.3)",
      "red-mid": "#910234",
      "black-half": "rgb(0, 0, 0, 0.45)",
      transparent: "rgb(0, 0, 0, 0)",
      white: "#ffffff",
    },
    backgroundImage: ({ theme }) => ({
      gradient: "linear-gradient(114deg, #31112e 0%, #0e1644 100%)",
      gradientRev: "linear-gradient(114deg, #0e1644 0%, #181e2a 100%)",
      gradient2: "linear-gradient(180deg, #0080ff 0%, #c428b6 100%)",
      gradient3: "linear-gradient(114deg, rgba(0,128,255,0.3) 0%, rgba(196,40,182,0.3) 100%)",
      gradient4: "linear-gradient(114deg, #0080ff 0%, #c428b6 100%)",
      gradient5: "linear-gradient(114deg, rgba(0,128,255,0.6) 0%, rgba(196,40,182,0.6) 100%)",
    }),
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
