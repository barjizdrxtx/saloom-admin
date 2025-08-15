import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Custom minimum width for xs breakpoint
        // You can add other custom breakpoints as needed
      },
      colors: {
        primary: "#1E90FF", // Define your custom color
        secondary: "#CFA93C", // Define your custom color
        secondary_light:"#fdf9ec",
        secondary_dark: "#230203",
        dark: "#121212",
        dark2: "#0F0F0F",
        light: "white",
        light_primary: "#F8EBEB",
        dark_primary: "#51080A",
        orange: "#FFA500",
        grey: "#3E3E3E",
        yellows: "#EDCC5E",
        light_grey: "#A9A9AE",
        black2: "#0F0F0F",
      },
      top:{
        "100": "100",
      },
      width: {
        "120": "28rem",
        "84": "22rem",
        "150": "80rem",
      },
      height: {
        "150": "40rem",
        "120": "32rem",
        "115": "30rem",
        "110": "27rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
