/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "calc(var(--vh, 1vh) * 100)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "disabled-gray": "rgba(120, 120, 128, 0.2)",
      },
      fontFamily: {
        sf_pro_rounded: ["SF_Pro_Rounded", "sans-serif"],
        orelega_one: ["Orelega_One", "sans-serif"],
        sf_pro_text: ["SF_Pro_Text", "sans-serif"],
        sf_pro_display: ["SF_Pro_Display", "sans-serif"],
        sf_mono: ["SF_Mono", "sans-serif"],
      },
      animation: {
        grow: "grow 3s infinite",
      },
      keyframes: {
        grow: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
