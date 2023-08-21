/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#add8e6",
      },
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
        sans: [
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"SF Pro Rounded"',
          '"SF Mono"',
          '"Orelega One"',
          "sans-serif",
        ],
        sf_pro_rounded: ["SF_Pro_Rounded", "sans-serif"],
        orelega_one: ["Orelega_One", "sans-serif"],
        sf_pro_text: ["SF_Pro_Text", "sans-serif"],
        sf_pro_display: ["SF_Pro_Display", "sans-serif"],
        sf_mono: ["SF_Mono", "sans-serif"],
      },
      keyframes: {
        drawCircle: {
          "0%": {
            strokeDashoffset: "300",
            opacity: "0.1",
          },
          "10%": {
            opacity: "0.1",
          },
          "20%": {
            opacity: "0.2",
          },
          "100%": {
            strokeDashoffset: "0",
            opacity: "0.9",
          },
        },
      },
      animation: {
        drawCircle: `drawCircle 2.5s forwards ease-in-out`,
      },
    },
  },
  plugins: [],
};
