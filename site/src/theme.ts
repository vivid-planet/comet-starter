import { css } from "styled-components";

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
    typography: {
        h600: css`
            font-size: 32px;
            line-height: 110%;
            font-weight: 600;
            margin-bottom: 20px;

            ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
                font-size: 48px;
            }

            ${({ theme }) => theme.breakpoints.md.mediaQuery} {
                font-size: 61px;
                margin-bottom: 30px;
            }

            ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
                font-size: 90px;
            }
        `,
        h550: css`
            font-size: 29px;
            line-height: 110%;
            font-weight: 600;
            margin-bottom: 12px;

            ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
                font-size: 39px;
            }

            ${({ theme }) => theme.breakpoints.md.mediaQuery} {
                font-size: 48px;
                margin-bottom: 16px;
            }

            ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
                font-size: 67px;
                margin-bottom: 20px;
            }
        `,
        h500: css`
            font-size: 26px;
            line-height: 110%;
            font-weight: 600;
            margin-bottom: 12px;

            ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
                font-size: 33px;
            }

            ${({ theme }) => theme.breakpoints.md.mediaQuery} {
                font-size: 39px;
                margin-bottom: 16px;
            }

            ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
                font-size: 50px;
                margin-bottom: 20px;
            }
        `,
        h450: css`
            font-size: 23px;
            line-height: 110%;
            font-weight: 600;
            margin-bottom: 6px;

            ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
                font-size: 28px;
            }

            ${({ theme }) => theme.breakpoints.md.mediaQuery} {
                font-size: 31px;
                margin-bottom: 8px;
            }

            ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
                font-size: 38px;
                margin-bottom: 10px;
            }
        `,
        h400: css`
            font-size: 20px;
            line-height: 110%;
            font-weight: 600;
            margin-bottom: 6px;

            ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
                font-size: 23px;
            }

            ${({ theme }) => theme.breakpoints.md.mediaQuery} {
                font-size: 25px;
                margin-bottom: 8px;
            }

            ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
                font-size: 28px;
                margin-bottom: 10px;
            }
        `,
        p200: css`
            font-size: 16px;
            line-height: 120%;
            font-weight: 300;
            margin-bottom: 18px;
        `,
        p100: css`
            font-size: 14px;
            line-height: 120%;
            font-weight: 300;
            margin-bottom: 10px;
        `,
        buttonText: css`
            font-size: 16px;
            line-height: 110%;
            font-weight: 600;
        `,
    },
};

export default theme;
