import { gridTotalColumns } from "@src/theme";
import { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

interface BlockRootProps extends HTMLAttributes<HTMLDivElement> {
    grid?: boolean;
    children?: ReactNode;
}

export const BlockRoot = ({ grid, children, ...restProps }: BlockRootProps) => (
    <Root $grid={grid} {...restProps}>
        {children}
    </Root>
);

const Root = styled.div<{ $grid?: boolean }>`
    max-width: var(--defaultMaxWidth);
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 ${({ theme }) => theme.spacing.D100};

    ${({ $grid }) =>
        $grid &&
        css`
            display: grid;
            grid-template-columns: repeat(${gridTotalColumns}, 1fr);
        `}
`;
