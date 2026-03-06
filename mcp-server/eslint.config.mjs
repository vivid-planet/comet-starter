import eslintConfigCore from "@comet/eslint-config/core.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";

/** @type {import("eslint")} */
const config = [
    {
        ignores: ["dist/**", "src/**/*.generated.ts"],
    },
    ...eslintConfigCore,
    {
        rules: {
            "@comet/no-other-module-relative-import": "off",
        },
    },
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
];

export default config;
