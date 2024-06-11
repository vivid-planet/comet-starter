import { gridTotalColumns } from "@src/theme";
import { ReactNode } from "react";
import styled from "styled-components";

interface ConditionalPageGridLayoutProps {
    pageGridLayout?: boolean;
    gridColumn?: string;
    children?: ReactNode;
}

export const ConditionalPageGridLayout = ({ pageGridLayout, gridColumn, children }: ConditionalPageGridLayoutProps) => {
    if (pageGridLayout && gridColumn) {
        return (
            <Root>
                <Wrapper $gridColumn={gridColumn}>{children}</Wrapper>
            </Root>
        );
    }
    if (pageGridLayout) {
        return <Root>{children}</Root>;
    }
    return <>{children}</>;
};

const Root = styled.div`
    max-width: ${({ theme }) => theme.defaultMaxWidth};
    margin: 0 auto;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(${gridTotalColumns}, 1fr);
`;

const Wrapper = styled.div<{ $gridColumn: string }>`
    grid-column: ${({ $gridColumn }) => $gridColumn};
`;
