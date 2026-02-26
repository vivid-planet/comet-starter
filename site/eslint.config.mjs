import eslintConfigNextJs from "@comet/eslint-config/nextjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["**/**/*.generated.ts", "dist/**", "lang/**", "lang-compiled/**", "lang-extracted/**", ".next/**", "public/**"]),
    ...eslintConfigNextJs,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
]);

export default config;
