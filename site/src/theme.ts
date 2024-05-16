import { Breakpoint, ThemeInterface } from "./theme.common";

const createBreakpoint = (value: number): Breakpoint => {
    return {
        mediaQuery: `@media (min-width: ${value}px)`,
        value: value,
    };
};

const theme: ThemeInterface = {
    palette: {
        primary: {
            light: "#4b9fea",
            main: "#1e88e5",
            dark: "#155fa0",
            contrastText: "#ffffff",
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
        common: {
            black: "#000000",
            white: "#ffffff",
        },
    },
    fonts: {
        primary: "Poppins, sans-serif",
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
    zIndex: {
        mobileStepper: 1000,
        fab: 1050,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
};

export default theme;
