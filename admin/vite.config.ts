import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

import { environment as envVarsToLoad } from "./src/environment";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                entry: resolve(__dirname, "src/loader.ts"),
                inject: {
                    data: {
                        environmentValues: envVarsToLoad
                            .map(
                                (envVarKey) =>
                                    `window.EXTERNAL__${envVarKey}__ = ${
                                        mode === "production"
                                            ? `$${envVarKey}`
                                            : process.env[envVarKey]
                                            ? JSON.stringify(process.env[envVarKey])
                                            : undefined
                                    };`,
                            )
                            .join("\n"),
                    },
                },
            }),
        ],
        server: {
            port: Number(process.env.ADMIN_PORT),
        },
        define: {
            // define NODE_ENV for packages using it
            "process.env.NODE_ENV": mode === "production" ? "'production'" : "'development'",
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
        resolve: {
            alias: {
                "@src": resolve(__dirname, "./src"),
            },
        },
        build: {
            outDir: "build",
        },
    };
});
