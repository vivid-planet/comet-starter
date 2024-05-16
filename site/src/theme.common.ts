export interface Breakpoint {
    mediaQuery: string;
    value: number;
}

interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
}

interface PaletteColorGraduation {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

export interface ThemeInterface {
    palette: {
        primary: PaletteColor;
        grey: PaletteColorGraduation;
        error: PaletteColor;
        warning: PaletteColor;
        info: PaletteColor;
        success: PaletteColor;
        common: {
            black: string;
            white: string;
        };
    };
    shape: {
        borderRadius: number;
    };
    breakpoints: {
        xs: Breakpoint;
        sm: Breakpoint;
        md: Breakpoint;
        lg: Breakpoint;
    };
    zIndex: {
        mobileStepper: number;
        fab: number;
        speedDial: number;
        appBar: number;
        drawer: number;
        modal: number;
        snackbar: number;
        tooltip: number;
    };
}

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ThemeInterface {}
}
