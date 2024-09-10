import { createGlobalStyle } from "styled-components";

export const DisableBodyScrolling = createGlobalStyle`
    html {
        overflow: hidden;
        overscroll-behavior: contain;
        height: 100vh;
    }
`;
