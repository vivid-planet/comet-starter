import { gridTotalColumns } from "@src/theme";
import styled from "styled-components";

export const GridRoot = styled.div`
    max-width: ${({ theme }) => theme.defaultMaxWidth};
    margin: 0 auto;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(${gridTotalColumns}, 1fr);
`;
