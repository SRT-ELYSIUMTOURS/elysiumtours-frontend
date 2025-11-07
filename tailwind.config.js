/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: "var(--font-raleway)",
      },
      colors: {
        primary: {
          light: {
            DEFAULT: "var(--color-primary-light-default)",
            hover: "var(--color-primary-light-hover)",
            active: "var(--color-primary-light-active)",
          },
          normal: {
            DEFAULT: "var(--color-primary-normal-default)",
            hover: "var(--color-primary-normal-hover)",
            active: "var(--color-primary-normal-active)",
          },
          dark: {
            DEFAULT: "var(--color-primary-dark-default)",
            hover: "var(--color-primary-dark-hover)",
            active: "var(--color-primary-dark-active)",
            darker: "var(--color-primary-dark-darker)",
          },
        },
        secondary: {
          light: {
            DEFAULT: "var(--color-secondary-light-default)",
            hover: "var(--color-secondary-light-hover)",
            active: "var(--color-secondary-light-active)",
          },
          normal: {
            DEFAULT: "var(--color-secondary-normal-default)",
            hover: "var(--color-secondary-normal-hover)",
            active: "var(--color-secondary-normal-active)",
          },
          dark: {
            DEFAULT: "var(--color-secondary-dark-default)",
            hover: "var(--color-secondary-dark-hover)",
            active: "var(--color-secondary-dark-active)",
            darker: "var(--color-secondary-dark-darker)",
          },
        },
        tertiary: {
          light: {
            DEFAULT: "var(--color-tertiary-light-default)",
            hover: "var(--color-tertiary-light-hover)",
            active: "var(--color-tertiary-light-active)",
          },
          normal: {
            DEFAULT: "var(--color-tertiary-normal-default)",
            hover: "var(--color-tertiary-normal-hover)",
            active: "var(--color-tertiary-normal-active)",
          },
          dark: {
            DEFAULT: "var(--color-tertiary-dark-default)",
            hover: "var(--color-tertiary-dark-hover)",
            active: "var(--color-tertiary-dark-active)",
            darker: "var(--color-tertiary-dark-darker)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}