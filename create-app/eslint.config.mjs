import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["src/db/migrations/**", "dist/**", "src/**/*.generated.ts", "package-lock.json"]),
    ...eslintConfigNestJs,
    {
        rules: {
            "@comet/no-other-module-relative-import": "off",
        },
    },
]);

export default config;
