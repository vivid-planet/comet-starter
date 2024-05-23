import { createGlobalStyle } from "styled-components";

const spacing = {
    D400: "var(--spacing-d400)",
    D300: "var(--spacing-d300)",
    D200: "var(--spacing-d200)",
    D100: "var(--spacing-d100)",
    S600: "var(--spacing-s600)",
    S500: "var(--spacing-s500)",
    S400: "var(--spacing-s400)",
    S300: "var(--spacing-s300)",
    S200: "var(--spacing-s200)",
    S100: "var(--spacing-s100)",
};

const ResponsiveSpacingStyle = createGlobalStyle`
    :root {
        --spacing-d400: 72px;
        --spacing-d300: 44px;
        --spacing-d200: 28px;
        --spacing-d100: 20px;
        --spacing-s600: 32px;
        --spacing-s500: 24px;
        --spacing-s400: 16px;
        --spacing-s300: 12px;
        --spacing-s200: 8px;
        --spacing-s100: 4px;
    }

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        :root {
            --spacing-d400: 96px;
            --spacing-d300: 68px;
            --spacing-d200: 52px;
            --spacing-d100: 24px;
        }
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        :root {
            --spacing-d400: 120px;
            --spacing-d300: 84px;
            --spacing-d200: 64px;
            --spacing-d100: 32px;
        }
    }

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        :root {
            --spacing-d400: 172px;
            --spacing-d300: 100px;
            --spacing-d200: 72px;
            --spacing-d100: 48px;
        }
    }
`;

export { ResponsiveSpacingStyle, spacing };
