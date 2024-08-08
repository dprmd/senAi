import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Create a unique chunk name for each file in node_modules
            return id
              .toString()
              .split("node_modules/")[1]
              .replace(/\//g, "-")
              .replace(/^\./, "");
          }
          if (id.includes("src")) {
            // Create a unique chunk name for each file in src
            const fileName = path.relative(process.cwd(), id);
            return fileName.replace(/\//g, "-");
          }
          // Fallback chunk name
          return null;
        },
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "SenAi",
        short_name: "SenAi",
        description: "Ai ChatBot",
        theme_color: "#ffffff",
        icons: [
          {
            src: "img/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/senAi/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
