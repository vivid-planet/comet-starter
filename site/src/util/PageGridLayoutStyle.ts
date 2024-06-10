import { gridTotalColumns } from "@src/theme";
import { css } from "styled-components";

export const pageGridLayoutStyle = css`
    max-width: ${({ theme }) => theme.defaultMaxWidth};
    margin: 0 auto;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(${gridTotalColumns}, 1fr);

    //default grid-column for standard blocks
    grid-column: 3 / 23;
`;
