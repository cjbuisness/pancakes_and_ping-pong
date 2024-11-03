/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html", // Add the path to your HTML file
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust if you have a source directory
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require("daisyui"),
    ],
  }
  