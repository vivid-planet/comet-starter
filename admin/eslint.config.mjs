import eslintConfigReact from "@comet/eslint-config/react.js";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["schema.json", "src/fragmentTypes.json", "dist/**", "src/**/*.generated.ts", "src/**/generated/**", "block-meta.json", "**/pnpm-lock.yaml", "lang/**", "lang-compiled/**", "lang-extracted/**"]),
    ...eslintConfigReact,
]);

export default config;
