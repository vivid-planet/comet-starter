import react from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

import { persistedQueriesPlugin } from "./src/framework/vite/persistedQueriesPlugin.ts";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

// CommonJS packages imported by client components. They are pre-bundled for SSR in development, as Node.js' CommonJS interop doesn't
// support their named exports (prop-types, imported by react-focus-lock) or default export (redraft, uses __esModule).
const commonJsClientDependencies = ["prop-types", "redraft"];

/**
 * @vitejs/plugin-rsc expects the server entries to be named index.js (and imports them as ES modules). As this package isn't
 * "type": "module" (that would change the CommonJS interop of dependencies), mark the server build output as ES modules.
 */
function esmServerOutputPlugin(): Plugin {
    return {
        name: "esm-server-output",
        applyToEnvironment: (environment) => environment.name === "rsc" || environment.name === "ssr",
        config: () => ({
            environments: Object.fromEntries(
                ["rsc", "ssr"].map((name) => [
                    name,
                    { build: { rollupOptions: { output: { entryFileNames: "[name].js", chunkFileNames: "_assets/[name]-[hash].js" } } } },
                ]),
            ),
        }),
        generateBundle() {
            this.emitFile({ type: "asset", fileName: "package.json", source: JSON.stringify({ type: "module" }) });
        },
    };
}

export default defineConfig(({ command }) => ({
    plugins: [
        rsc({
            entries: {
                rsc: "./src/framework/entry.rsc.tsx",
                ssr: "./src/framework/entry.ssr.tsx",
                client: "./src/framework/entry.browser.tsx",
            },
        }),
        react(),
        persistedQueriesPlugin({ include: srcDir, persistedQueriesPath: "dist/persisted-queries.json" }),
        esmServerOutputPlugin(),
    ],
    resolve: {
        alias: { "@src": srcDir },
    },
    // Environment variables are loaded with dotenv-cli at runtime (see package.json), not at build time. Also, .env sets NODE_ENV=development,
    // which would result in a development build.
    envDir: false,
    environments: {
        ssr: {
            resolve: {
                // The SSR environment only renders client components. For production, bundle all their dependencies, as some packages only
                // work with a bundler (e.g. focus-lock uses directory imports).
                // In development, only process the packages that don't work when loaded by Node.js directly (see below). swiper/react
                // imports React without declaring a peer dependency, it must use the same React instance as the SSR environment.
                noExternal: command === "build" ? true : [...commonJsClientDependencies, "swiper"],
            },
            optimizeDeps: { include: commonJsClientDependencies },
        },
    },
    server: {
        host: process.env.SERVER_HOST,
        port: parseInt(process.env.SITE_PORT || "3000", 10),
        strictPort: true,
        // The site is multi-domain (see site-configs), the domain middleware decides which hosts are valid
        allowedHosts: true,
    },
    build: {
        // public/assets/ is used for static files, see server.mts for caching of both directories
        assetsDir: "_assets",
    },
}));
