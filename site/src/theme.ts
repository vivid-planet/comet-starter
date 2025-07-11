const createBreakpoint = (value: number) => {
    return {
        mediaQuery: `@media (min-width: ${value}px)`,
        value: value,
    };
};

export const theme = {
    palette: {
        primary: {
            light: "#4b9fea",
            main: "#1e88e5",
            dark: "#155fa0",
            contrastText: "#ffffff",
        },
        text: {
            primary: "#212121",
            secondary: "#757575",
            inverted: "#ffffff",
        },
        gray: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        },
    },
    fontFamily: "Roboto, sans-serif",
    breakpoints: {
        sm: createBreakpoint(600),
        md: createBreakpoint(900),
        lg: createBreakpoint(1200),
        xl: createBreakpoint(1600),
    },
    spacing: {
        d100: "var(--spacing-d100)",
        d200: "var(--spacing-d200)",
        d300: "var(--spacing-d300)",
        d400: "var(--spacing-d400)",
        s100: "var(--spacing-s100)",
        s200: "var(--spacing-s200)",
        s300: "var(--spacing-s300)",
        s400: "var(--spacing-s400)",
        s500: "var(--spacing-s500)",
        s600: "var(--spacing-s600)",
    },
};

export type Theme = typeof theme;

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends Theme {}
}
