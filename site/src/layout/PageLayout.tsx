import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

const pageLayoutGridTotalColumns = 24;

interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
    grid?: boolean;
}

export const PageLayout = ({ grid, ...restProps }: PageLayoutProps) => <Root $grid={grid} {...restProps} />;

const Root = styled.div<{ $grid?: boolean }>`
    max-width: ${({ theme }) => theme.pageLayoutDefaultMaxWidth};
    margin: 0 auto;

    ${({ $grid }) =>
        $grid &&
        css`
            display: grid;
            grid-template-columns: repeat(${pageLayoutGridTotalColumns}, 1fr);
        `}
`;
