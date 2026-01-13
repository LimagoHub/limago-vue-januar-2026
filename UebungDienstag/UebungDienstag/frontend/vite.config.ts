import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/WeatherForecast": {
                target: "https://localhost:7180", // an deinen Backend-HTTPS-Port anpassen
                changeOrigin: true,
                secure: false,
            },
        },
    },
});

