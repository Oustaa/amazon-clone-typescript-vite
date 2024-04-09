import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: {
    //   "@": path.resolve("./src"),
    //   "@components": path.resolve("src/components"),
    //   "@store": path.resolve("src/store"),
    //   "@routes": path.resolve("src/routes"),
    // },
  },
});

