import { gridTotalColumns } from "@src/theme";
import { HTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface PageLayoutProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    grid?: boolean;
}

export const PageLayout = ({ grid, children, ...restProps }: PageLayoutProps) => (
    <Root $grid={grid} {...restProps}>
        {children}
    </Root>
);

const Root = styled.div<{ $grid?: boolean }>`
    max-width: ${({ theme }) => theme.defaultMaxWidth};
    margin: 0 auto;

    ${({ $grid }) =>
        $grid &&
        css`
            display: grid;
            grid-template-columns: repeat(${gridTotalColumns}, 1fr);
        `}
`;
