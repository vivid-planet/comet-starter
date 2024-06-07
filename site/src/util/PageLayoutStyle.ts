import { css } from "styled-components";

export const pageLayoutStyle = css`
    max-width: var(--defaultMaxWidth);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 ${({ theme }) => theme.spacing.D100};
`;
