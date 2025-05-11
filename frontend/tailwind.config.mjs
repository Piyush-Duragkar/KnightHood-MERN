// import daisyui from "daisyui";
// import daisyUIThemes from "daisyui/src/theming/themes";

// /** @type {import('tailwindcss').Config} */
// export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
// export const theme = {
//   extend: {},
// };
// export const plugins = [daisyui];
// export const daisyui = {
//   themes: [
//     "light",
//     {
//       black: {
//         ...daisyUIThemes["black"],
//         primary: "rgb(29, 155, 240)",
//         secondary: "rgb(24, 24, 24)",
//       },
//     },
//     "light",
//   ],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-true": "#000000", // Optional alias if you want pitch black
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        black: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#000000", // violet-500
          secondary: "#000000", // pink-500
          accent: "#000000", // teal-500
          neutral: "#000000", // gray-800
          "base-100": "#000000", // Set true black background
          info: "#000000",
          success: "#000000",
          warning: "#000000",
          error: "#000000",
        },
      },
    ],
    darkTheme: "black", // use this as the dark theme
  },
};
