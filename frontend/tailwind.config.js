/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg:      "#0f1117",
        surface: "#1a1d27",
        border:  "#2a2d3e",
        muted:   "#64748b",
      }
    },
  },
  plugins: [],
}
