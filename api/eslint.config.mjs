import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["src/db/migrations/**", "dist/**", "src/**/*.generated.ts", "src/**/generated", "block-meta.json", "package-lock.json", "uploads/**"]),
    ...eslintConfigNestJs,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
]);

export default config;
