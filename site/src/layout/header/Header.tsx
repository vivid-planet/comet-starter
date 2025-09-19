"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLayout } from "@src/layout/PageLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { DesktopMenu } from "./DesktopMenu";
import { type GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

export const Header = ({ header }: Props) => {
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    useEffect(() => {
        if (!expandedSubLevelNavigation) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setExpandedSubLevelNavigation(null);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [expandedSubLevelNavigation]);

    return (
        <header>
            <PageLayout grid>
                <PageLayoutContent>
                    <Root>
                        <Link href="/">
                            <SvgUse href="/assets/comet-logo.svg#root" />
                        </Link>

                        <DesktopMenu header={header} />

                        <MobileMenu header={header} />
                    </Root>
                </PageLayoutContent>
            </PageLayout>
        </header>
    );
};

const PageLayoutContent = styled.div`
    grid-column: 2 / -2;
`;

const Root = styled.nav`
    display: flex;
    height: var(--header-height);
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["200"]};
`;
