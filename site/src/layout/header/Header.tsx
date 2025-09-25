"use client";
import { Button } from "@src/common/components/Button";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLayout } from "@src/layout/PageLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";

import { DesktopMenu } from "./DesktopMenu";
import { type GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

export const Header = ({ header }: Props) => {
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);
    const intl = useIntl();

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
            <SkipLink href="#mainContent">
                <Button as="span">
                    <FormattedMessage defaultMessage="Skip to main content" id="skipLink.skipToMainContent" />
                </Button>
            </SkipLink>
            <SkipLink href="#footer">
                <Button as="span">
                    <FormattedMessage defaultMessage="Skip to footer" id="skipLink.skipToFooter" />
                </Button>
            </SkipLink>
            <PageLayout grid>
                <PageLayoutContent>
                    <Root>
                        <Link href="/" title={intl.formatMessage({ id: "header.logo.title", defaultMessage: "Comet DXP Logo" })}>
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

const SkipLink = styled.a`
    position: fixed;
    top: 120px;
    left: 20px;
    z-index: 100;
    opacity: 0;

    /* Hide the skip link visually but keep it accessible for screen readers */
    height: 1px;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);

    &:focus {
        opacity: 1;
        height: auto;
        width: auto;
        clip-path: none;
    }
`;

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
