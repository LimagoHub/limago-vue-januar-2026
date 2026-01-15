import { defineConfig } from "vite";
import { fileURLToPath, URL } from 'node:url'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Hier wird das @ auf den src-Ordner gemappt
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      // "wildcard" via RegExp, matcht alles ab /api...
      "^/api/.*": {
        target: "https://localhost:7180",
        changeOrigin: true,
        secure: false,
      },
      // falls dein Backend http nutzt:
      // "^/api/.*": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
