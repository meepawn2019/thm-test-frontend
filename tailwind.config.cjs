/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#153376",
        secondary: "#4d4f5c",
      },
    },
  },
  plugins: [],
};
