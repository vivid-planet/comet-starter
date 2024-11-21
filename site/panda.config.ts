import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            tokens: {
                colors: {
                    primary: {
                        light: { value: "#4b9fea" },
                        main: { value: "#1e88e5" },
                        dark: { value: "#155fa0" },
                        contrastText: { value: "#ffffff" },
                    },
                    text: {
                        primary: { value: "#212121" },
                        secondary: { value: "#757575" },
                        inverted: { value: "#ffffff" },
                    },
                    gray: {
                        50: { value: "#fafafa" },
                        100: { value: "#f5f5f5" },
                        200: { value: "#eeeeee" },
                        300: { value: "#e0e0e0" },
                        400: { value: "#bdbdbd" },
                        500: { value: "#9e9e9e" },
                        600: { value: "#757575" },
                        700: { value: "#616161" },
                        800: { value: "#424242" },
                        900: { value: "#212121" },
                    },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",

    // The JSX framework to use
    jsxFramework: "react",

    // The CSS Syntax to use to use
    syntax: "template-literal",
});
