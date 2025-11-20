import eslintConfigNestJs from "@comet/eslint-config/nestjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";

const config = [
    {
        ignores: ["src/db/migrations/**", "dist/**", "src/**/*.generated.ts", "src/**/generated"],
    },
    ...eslintConfigNestJs,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
];

export default config;
