import { createGlobalStyle } from "styled-components";

export const DisableBodyScrolling = createGlobalStyle`
    html {
        overflow: hidden;
        height: 100vh;
    }
`;
