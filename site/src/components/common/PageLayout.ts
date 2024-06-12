import { gridTotalColumns } from "@src/theme";
import styled from "styled-components";

export const PageLayout = styled.div`
    max-width: ${({ theme }) => theme.defaultMaxWidth};
    margin: 0 auto;
`;

export const PageGridLayout = styled(PageLayout)`
    display: grid;
    grid-template-columns: repeat(${gridTotalColumns}, 1fr);
`;

export const StandardPageGridColumn = styled.div`
    grid-column: 3 / 23;
`;
