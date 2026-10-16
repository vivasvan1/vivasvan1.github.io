import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "build" },
  plugins: [
    react(),
    {
      name: "copy-404-for-github-pages",
      closeBundle() {
        const outDir = path.resolve(__dirname, "build");
        const indexPath = path.join(outDir, "index.html");
        const notFoundPath = path.join(outDir, "404.html");
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
