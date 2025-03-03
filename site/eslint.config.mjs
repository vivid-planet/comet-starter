// TODO: integrate custom rules from project into new eslint.config.mjs file
 // 
 // Content from .eslintrc.json:
 //
 // {
//     "extends": ["@comet/eslint-config/nextjs", "plugin:@cspell/recommended"],
//     "ignorePatterns": [
//         "**/**/*.generated.ts",
//         "dist/**",
//         "lang/**",
//         "lang-compiled/**",
//         "lang-extracted/**",
//         ".next/**",
//         "public/**",
//         "src/site-configs.d.ts"
//     ],
//     "rules": {
//         "no-restricted-imports": [
//             "error",
//             {
//                 "paths": [
//                     {
//                         "name": "react",
//                         "importNames": ["default"]
//                     }
//                 ]
//             }
//         ]
//     }
// }
// 
 import eslintConfigNextJs from "@comet/eslint-config/nextjs.js";

/** @type {import('eslint')} */
const config = [
    {
        ignores: ["**/**/*.generated.ts", "dist/**", "lang/**", "lang-compiled/**", "lang-extracted/**", ".next/**", "public/**"],
    },
    ...eslintConfigNextJs,
];

export default config;