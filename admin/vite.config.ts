import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@src": resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 8000,
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis. https://github.com/vitejs/vite/discussions/5912
            // "gloabl is not defined" occures dirctly after loading. used by draft-is package
            define: {
                global: "globalThis",
            },
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/loader.ts"),
            name: "loader",
            fileName: "comet-admin",
            formats: ["cjs"],
        },
    },
});
