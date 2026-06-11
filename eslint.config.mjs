import eslintConfigCore from "@comet/eslint-config/core.js";
import { defineConfig, globalIgnores } from "eslint/config";

const config = defineConfig([
    globalIgnores(["admin/**", "api/**", "site/**", "create-app/**", "node_modules/**", "package-lock.json"]),
    ...eslintConfigCore,
]);

export default config;
