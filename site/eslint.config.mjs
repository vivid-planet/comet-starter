import eslintConfigNextJs from "@dextinity/eslint-config/nextjs.js";
import { defineConfig, globalIgnores } from "eslint/config";

const docsLink = "https://cms-docs.dextinity.com/docs/faqs/environment-variables-in-site";

// The site doesn't use Next.js anymore: reuse the Dextinity Next.js preset (React, GraphQL, import rules) without the Next.js plugin.
// TODO: replace with a framework agnostic site preset once @dextinity/eslint-config provides one
const eslintConfigSite = eslintConfigNextJs
    .filter((config) => !config.plugins?.["@next/next"])
    .map((config) =>
        config.rules ? { ...config, rules: Object.fromEntries(Object.entries(config.rules).filter(([rule]) => !rule.startsWith("@next/next/"))) } : config,
    );

const config = defineConfig([
    globalIgnores(["**/**/*.generated.ts", "dist/**", "lang/**", "lang-compiled/**", "lang-extracted/**", "public/**", "block-meta.json", "package-lock.json"]),
    ...eslintConfigSite,
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
]);

export default config;
