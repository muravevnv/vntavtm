export default {
  content: [
    "./src/**/*.{html,js}",
    "./src/components/**/*.html",
    "./dist/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Manrope", // Ваш шрифт
          "system-ui", // Фолбэк
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Добавляем свои цвета
        primary: "#3B8BEA",
        secondary: "#78859F",
        accent: "#ff006e",
        attention: "#FD5D5D",
        graphite: "#323338",
        "custom-gray": {
          100: "#f7fafc",
          200: "#edf2f7",
          // ... и так далее до 900
        },
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
