import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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
  plugins: [react()],
  base: "/senAi/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
