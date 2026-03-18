import eslintConfigReact from "@comet/eslint-config/react.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["schema.json", "src/fragmentTypes.json", "dist/**", "src/**/*.generated.ts", "src/**/generated/**", "block-meta.json", "**/package-lock.json", "lang/**", "lang-compiled/**", "lang-extracted/**"]),
    ...eslintConfigReact,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
]);

export default config;
