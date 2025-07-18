/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dev: {
          bg: "hsl(var(--dev-bg))",
          surface: "hsl(var(--dev-surface))",
          border: "hsl(var(--dev-border))",
          text: "hsl(var(--dev-text))",
          accent: "hsl(var(--dev-accent))",
          success: "hsl(var(--dev-success))",
          warning: "hsl(var(--dev-warning))",
          error: "hsl(var(--dev-error))",
        },
      },
    },
  },
  plugins: [],
};
