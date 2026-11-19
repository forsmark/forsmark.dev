import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  build: {
    rollupOptions: {
      // One HTML file per page, so GitHub Pages serves each case study as a real file.
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        copenscene: resolve(import.meta.dirname, "work/copenscene/index.html"),
      },
    },
  },
});
