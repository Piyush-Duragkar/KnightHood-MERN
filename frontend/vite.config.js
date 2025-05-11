import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: "./tailwind.config.mjs", // Point to your config file
    }),
  ],
  server: {
    port: 3000,
  },
});
