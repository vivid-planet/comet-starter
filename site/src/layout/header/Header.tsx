"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { DesktopHeaderMenu } from "@src/layout/header/DesktopHeaderMenu";
import { PageLayout } from "@src/layout/PageLayout";
import styled from "styled-components";

import { GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

const Header = ({ header }: Props) => {
    return (
        <header>
            <PageLayout grid>
                <PageLayoutContent>
                    <Root>
                        <SvgUse href="/assets/comet-logo.svg#logo" />
                        <DesktopHeaderMenu header={header} />
                    </Root>
                </PageLayoutContent>
            </PageLayout>
        </header>
    );
};

const PageLayoutContent = styled.div`
    grid-column: 2 / -2;
`;

const Root = styled.div`
    display: flex;
    height: 100px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["200"]};
`;

export { Header };
