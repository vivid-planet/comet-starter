import { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export interface Breakpoint {
    mediaQuery: string;
    value: number;
}

export interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
}

export interface ColorGraduation {
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
    name: string;
    palette: {
        primary: PaletteColor;
        grey: ColorGraduation;
        error: PaletteColor;
        warning: PaletteColor;
        info: PaletteColor;
        success: PaletteColor;
        common: {
            black: string;
            white: string;
        };
    };
    fonts: {
        primary: string;
    };
    shape: {
        borderRadius: number;
    };
    breakpoints: {
        XS: Breakpoint;
        SM: Breakpoint;
        MD: Breakpoint;
        LG: Breakpoint;
    };
    typography: Record<string, FlattenInterpolation<ThemeProps<DefaultTheme>>>;
}

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ThemeInterface {}
}
