import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Use '@' for the 'src' folder
    },
  },
  server: {
    port: 5173,  // Port for Vite development server
    open: true,  // Automatically open the browser
    proxy: {
      '/api': 'http://localhost:8000',  // Proxy requests to the backend API
    },
  },
  build: {
    outDir: 'build',  
    minify: true,  
    sourcemap: true,  
  },
  publicDir: 'static',  
});
