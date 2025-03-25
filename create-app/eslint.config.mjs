import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";

const config = [
    {
        ignores: ["src/db/migrations/**", "dist/**", "src/**/*.generated.ts"],
    },
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
];

export default config;

