// TODO: integrate custom rules from project into new eslint.config.mjs file
 // 
 // Content from .eslintrc.json:
 //
 // {
//     "extends": ["@comet/eslint-config/react", "plugin:@cspell/recommended"],
//     "ignorePatterns": ["schema.json", "src/fragmentTypes.json", "src/**/*.generated.ts", "src/site-configs.d.ts"],
//     "rules": {
//         "react/react-in-jsx-scope": "off"
//     }
// }
// 
 import eslintConfigReact from "@comet/eslint-config/react.js";

/** @type {import('eslint')} */
const config = [
    {
        ignores: ["schema.json", "src/fragmentTypes.json", "dist/**", "src/**/*.generated.ts"],
    },
    ...eslintConfigReact,
];

export default config;