/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./composables/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./nuxt.config.{js,ts}",
    "./error.vue",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      body: "Roboto Mono",
    },
    screens: {
      sm: "1px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        gray: {
          300: "#D1D5DB",
          400: "#9A9A9A",
          500: "#636363",
          600: "#414141",
          650: "#313131",
          700: "#272727",
          750: "#1E1E1E",
          800: "#1D1D1D",
          900: "#0C0C0C",
        },
      },
    },
  },
  plugins: [],
};
