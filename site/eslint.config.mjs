import eslintConfigNextJs from "@comet/eslint-config/nextjs.js";
import cspellPlugin from "@cspell/eslint-plugin";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

const docsLink = "https://docs.comet-dxp.com/docs/faqs/environment-variables-in-site";

const config = defineConfig([
    globalIgnores(["**/**/*.generated.ts", "dist/**", "lang/**", "lang-compiled/**", "lang-extracted/**", ".next/**", "public/**"]),
    ...eslintConfigNextJs,
    {
        plugins: {
            "@cspell": cspellPlugin,
        },
        ...cspellRecommended,
    },
    {
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector:
                        "MemberExpression[object.type='MemberExpression'][object.object.name='process'][object.property.name='env'][property.name=/^NEXT_PUBLIC_/]",
                    message: `Usage of process.env.NEXT_PUBLIC_* is not allowed. Use site configs or a custom provider instead. See ${docsLink}`,
                },
            ],
        },
    },
    {
        files: ["next.config.*"],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project: null,
                programs: null,
            },
        },
        rules: {
            "no-restricted-syntax": [
                "error",
                {
                    selector:
                        "MemberExpression[object.type='MemberExpression'][object.object.name='process'][object.property.name='env']",
                    message: `Usage of process.env in next.config is not allowed. Use site configs or runtime configuration instead. See ${docsLink}`,
                },
            ],
        },
    },
]);

export default config;
