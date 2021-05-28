// tailwind.config.js
module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#62c1bf",
      },
      backgroundImage: (theme) => ({
        grid: "url('/background-grid.svg')",
        logo: "url('/logo.svg')",
      }),
    },
  },
  variants: {},
  plugins: [],
};
