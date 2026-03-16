import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["src/db/migrations/**", "dist/**", "src/**/*.generated.ts", "package-lock.json"]),
    ...eslintConfigNestJs,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
    {
        rules: {
            "@comet/no-other-module-relative-import": "off",
        },
    },
]);

export default config;
