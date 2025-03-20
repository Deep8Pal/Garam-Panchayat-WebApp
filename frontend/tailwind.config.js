/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Abril Fatface", "serif"], // For titles/headings
        body: ["Space Grotesk", "sans-serif"], // For paragraph text
        fancy: ["Pacifico", "cursive"], // For special text (if needed)
        logo: ["Bebas Neue", "sans-serif"],
        sign: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
