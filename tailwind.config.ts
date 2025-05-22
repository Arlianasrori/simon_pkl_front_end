import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "left-linear": "#37A3FE",
        "right-linear": "#2995F3",
        bgcolor: "#EAEAEA",
        accentColor: "#38A3FF",
        primaryColor: "#0275D8",
        lightGray: "#EEEEEE",
        lightGrayForm: "#ABABAB",
        lightWhite: "#F1ECEC",
        lineColor: "#D2D2D2",
        limeGreen: "#15DF1D",
        LightGrayDate: "#C7C8CA"
      },
      zIndex: {
        "-10": "-10",
      },
      spacing: {
        "18": "4.5rem",
        "100": "50rem",
        "4.5": "4.5rem",
      },
      boxShadow: {
        'buttonShadow': '0 4px 10px 0 rgba(183, 183, 183, 0.15)',
      },
    },
  },
  darkMode: "class", // Dark mode should be outside the theme object
  plugins: [nextui({
    themes:{
      light:{
        colors:{
          default:{
            DEFAULT: "#FFFFFF",
            foreground: "#000000",
          }
        }
      }
    }
  })], // Plugins should also be outside the theme object
};

export default config;
