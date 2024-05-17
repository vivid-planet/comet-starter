const createBreakpoint = (value: number) => {
    return {
        mediaQuery: `@media (min-width: ${value}px)`,
        value: value,
    };
};

const theme = {
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
        },
        grey: {
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
        error: {
            light: "#c6523f",
            main: "#bc3520",
            dark: "#832617",
            contrastText: "#ffffff",
        },
        warning: {
            light: "#f5c15f",
            main: "#f3b346",
            dark: "#a87d32",
            contrastText: "#090909",
        },
        info: {
            light: "#73c1f2",
            main: "#5cb4f0",
            dark: "#417da6",
            contrastText: "#090909",
        },
        success: {
            light: "#77d06a",
            main: "#66c54f",
            dark: "#488938",
            contrastText: "#090909",
        },
    },
    shape: {
        borderRadius: 4,
    },
    breakpoints: {
        xs: createBreakpoint(600),
        sm: createBreakpoint(900),
        md: createBreakpoint(1200),
        lg: createBreakpoint(1600),
    },
};

declare module "styled-components" {
    type Theme = typeof theme;
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme {}
}

export { theme };
