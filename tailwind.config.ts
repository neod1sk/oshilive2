import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B10",
        surface: "#141421",
        red: "#FF2D55",
        yellow: "#FFD400",
        turquoise: "#00D2D3",
        violet: "#7E5BEF",
        blue: "#1DA1F2",
        white: "#FFFFFF",
        orange: "#FF8A00",
        green: "#27AE60",
        purple: "#8E44AD",
        pink: "#FF6FAE",
        light_green: "#A3EE68",
        light_blue: "#95E8FF",
        light_pink: "#FFC7E3",
        lime: "#BCFF00",
        hot_pink: "#FF2E93",
        shine_ocean: "#00B3FF",
        emerald_green: "#00C27A",
        pure_white: "#F7F7F7"
      },
      fontFamily: {
        display: ["'Exo 2'", "Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;



