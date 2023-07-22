/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      pureBlack: "#000000",
      black: "#272A2A",
      secondBlack: "#4D4D4D",
      white: "#FFFFFF",
      blue: "#4A71FD",
      hoverBlue: "#DDF6FF",
      silver: "#DDDDDD",
      doveGray: "#707070"
    },
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light"
  }
};
