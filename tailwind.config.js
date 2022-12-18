/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    colors: {
      primary: "#8B5CF6",
      primaryHeader: "#8B5CF6",
      secondary: "#A78BFA",
      secondaryHeader: "#A78BFA",
      white: "#F5F3FF",
      black: "#1F2937",
      text: {
        DEFAULT: "#1F2937",
        light: "#6C7281",
        white: "#F3F4F6",
      },
      light: {
        DEFAULT: "#C4B5FD",
        lighter: "F3F4F6",
      },
    },
    scale:{
      '105': '1.01',
    },

    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes: false,
  },
}
