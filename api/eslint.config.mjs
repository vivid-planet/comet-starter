import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["src/db/migrations/**", "dist/**", "src/**/*.generated.ts", "src/**/generated", "block-meta.json", "package-lock.json", "uploads/**"]),
    ...eslintConfigNestJs,
]);

export default config;
