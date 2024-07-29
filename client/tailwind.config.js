/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "small-to-big": {
          from: { scale: "0" },
          to: { scale: "1" },
        },
        "record-transition": {
          from: { scale: "1" },
          to: { scale: "1.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "small-to-big": "small-to-big 0.3s",
        "record-1": "record-transition 1s alternate infinite",
        "record-2": "record-transition 1.5s alternate infinite",
        "record-3": "record-transition 2s alternate infinite",
        "record-4": "record-transition 1s alternate infinite",
        "record-5": "record-transition 1.5s alternate infinite",
        "record-6": "record-transition 2s alternate infinite",
        "record-7": "record-transition 1s alternate infinite",
        "record-8": "record-transition 1.5s alternate infinite",
        "record-9": "record-transition 2s alternate infinite",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        dark: "#202C33",
        light: "#F0F2F5",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
