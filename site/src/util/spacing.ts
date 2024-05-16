import { createGlobalStyle } from "styled-components";

enum Spacing {
    d400 = "var(--spacing-400)",
    d300 = "var(--spacing-300)",
    d200 = "var(--spacing-200)",
    d100 = "var(--spacing-100)",
    s600 = "var(--spacing-s600)",
    s500 = "var(--spacing-s500)",
    s400 = "var(--spacing-s400)",
    s300 = "var(--spacing-s300)",
    s200 = "var(--spacing-s200)",
    s100 = "var(--spacing-s100)",
}

const ResponsiveSpacingStyle = createGlobalStyle`
    :root {
        --spacing-400: 72px;
        --spacing-300: 44px;
        --spacing-200: 28px;
        --spacing-100: 20px;
        --spacing-s600: 32px;
        --spacing-s500: 24px;
        --spacing-s400: 16px;
        --spacing-s300: 12px;
        --spacing-s200: 8px;
        --spacing-s100: 4px;
    }

    ${({ theme }) => theme.breakpoints.SM.mediaQuery} {
        :root {
            --spacing-400: 96px;
            --spacing-300: 68px;
            --spacing-200: 52px;
            --spacing-100: 24px;
        }
    }

    ${({ theme }) => theme.breakpoints.MD.mediaQuery} {
        :root {
            --spacing-400: 120px;
            --spacing-300: 84px;
            --spacing-200: 64px;
            --spacing-100: 32px;
        }
    }

    ${({ theme }) => theme.breakpoints.LG.mediaQuery} {
        :root {
            --spacing-400: 172px;
            --spacing-300: 100px;
            --spacing-200: 72px;
            --spacing-100: 48px;
        }
    }
`;

export { ResponsiveSpacingStyle, Spacing };
