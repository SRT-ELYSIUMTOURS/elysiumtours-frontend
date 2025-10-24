/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: {
            default: "#FEFEFE",
            hover: "#F7F7F7",
            active: "#FDFDFD",
          },
          normal: {
            default: "#F7F7F7",
            hover: "#DEDEDE",
            active: "#C6C6C6",
          },
          dark: {
            default: "#B9B9B9",
            hover: "#949494",
            active: "#6F6F6F",
            darker: "#565656",
          },
        },
        secondary: {
          light: {
            default: "#F2EAF9",
            hover: "#EBDFF5",
            active: "#D6BEEB",
          },
          normal: {
            default: "#7B2CBF",
            hover: "#6F28AC",
            active: "#622399",
          },
          dark: {
            default: "#5C218F",
            hover: "#4A1A73",
            active: "#371456",
            darker: "#2B0F43",
          },

        },
        tertiary: {
          light: {
            default: "#EAEAEA",
            hover: "#E0E0E0",
            active: "#BEBEBE",
          },
          normal: {
            default: "#2D2D2D",
            hover: "#292929",
            active: "#242424",
          },
          dark: {
            default: "#222222",
            hover: "#1B1B1B",
            active: "#141414",
            darker: "#101010",
          },

        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
