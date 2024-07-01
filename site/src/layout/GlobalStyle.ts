"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    /* Fix a problem with Flexbox to avoid overflows: https://defensivecss.dev/tip/flexbox-min-content-size/ */
    * {
        min-width: 0;
    }
    
    html {
        /* Prevent font size adjustments after orientation changes in mobile devices */
        -webkit-text-size-adjust: 100%;
    }

    body {
        margin: 0;
        /* Improve text rendering with font-smoothing */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: ${({ theme }) => theme.palette.text.primary};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
    }

    /* Prevent sub and sup elements from affecting the line height in all browsers */
    sub,
    sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    button,
    input,
    select,
    textarea {
        /* Use the application's default font for form elements */
        font: inherit;

        /* Remove default border-radius that is added by iOS Safari */
        border-radius: 0;
    }

    /* Improve media defaults */
    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    /* Create a root stacking context: https://www.joshwcomeau.com/css/custom-css-reset/#eight-root-stacking-context-9 */
    #root,
    #__next {
        isolation: isolate;
    }
`;
