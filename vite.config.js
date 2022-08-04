import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
    plugins: [
        vue(),
    ],
    build: {
        polyfillModulePreload: false,
        manifest: true,
        rollupOptions: {
            input: 'app.js',
        },
    },
});
