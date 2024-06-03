import { gridTotalColumns } from "@src/theme";
import { css } from "styled-components";

export const gridColumnsCSSVars = () => {
    let styles = "";

    for (let i = 0; i <= gridTotalColumns; i++) {
        styles += `
         --grid-column${i}: calc((100vw - var(--vwDiff)) / ${gridTotalColumns} * ${i});
     `;
    }

    return css`
        ${styles}
    `;
};
