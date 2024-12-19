"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { breakpoints, colors, font, spacing } from "@src/constants.yak";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import Link from "next/link";
import { styled } from "next-yak";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

export const Header = ({ header }: Props) => {
    const intl = useIntl();
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    const handleSubLevelNavigationButtonClick = (id: string) => {
        if (expandedSubLevelNavigation === id) {
            setExpandedSubLevelNavigation(null);
        } else {
            setExpandedSubLevelNavigation(id);
        }
    };

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
                            <SvgUse href="/assets/comet-logo.svg#logo" />
                        </Link>

                        <DesktopHeaderFullHeightNav>
                            <TopLevelNavigation>
                                {header.map((node) => {
                                    const visibleChildNodes = node.childNodes.filter((node) => !node.hideInMenu);
                                    return (
                                        <TopLevelLinkContainer
                                            key={node.id}
                                            onMouseEnter={() => setExpandedSubLevelNavigation(node.id)}
                                            onMouseLeave={() => setExpandedSubLevelNavigation(null)}
                                        >
                                            <LinkContainer>
                                                <MenuPageLink page={node} activeClassName="active" aria-label={node.name}>
                                                    {node.name}
                                                </MenuPageLink>
                                                {visibleChildNodes.length > 0 && (
                                                    <ToggleSubLevelNavigationButton
                                                        aria-label={intl.formatMessage(
                                                            {
                                                                id: "header.subMenu.arialLabel",
                                                                defaultMessage: "Submenu of {name}",
                                                            },
                                                            { name: node.name },
                                                        )}
                                                        aria-expanded={expandedSubLevelNavigation === node.id}
                                                        onClick={() => handleSubLevelNavigationButtonClick(node.id)}
                                                    >
                                                        <AnimatedChevron
                                                            href="/assets/icons/chevron-down.svg#chevron-down"
                                                            $isExpanded={expandedSubLevelNavigation === node.id}
                                                        />
                                                    </ToggleSubLevelNavigationButton>
                                                )}
                                            </LinkContainer>
                                            {visibleChildNodes.length > 0 && (
                                                <SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                                    {visibleChildNodes.map((node) => (
                                                        <li key={node.id}>
                                                            <MenuPageLink page={node} activeClassName="active" aria-label={node.name}>
                                                                {node.name}
                                                            </MenuPageLink>
                                                        </li>
                                                    ))}
                                                </SubLevelNavigation>
                                            )}
                                        </TopLevelLinkContainer>
                                    );
                                })}
                            </TopLevelNavigation>
                        </DesktopHeaderFullHeightNav>

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

const Root = styled.div`
    display: flex;
    height: var(--header-height);
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colors.gray["200"]};
`;

const DesktopHeaderFullHeightNav = styled.nav`
    height: 100%;
    display: none;

    ${breakpoints.sm} {
        display: block;
    }
`;

const TopLevelNavigation = styled.ol`
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: ${spacing.S600};
    height: 100%;
`;

const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    flex-direction: column;
    gap: ${spacing.S200};
    position: absolute;
    z-index: 40;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    list-style-type: none;
    padding: ${spacing.D100};
    background-color: white;
    border-left: 1px solid ${colors.gray["200"]};
    border-bottom: 1px solid ${colors.gray["200"]};
    border-right: 1px solid ${colors.gray["200"]};
`;

const TopLevelLinkContainer = styled.li`
    position: relative;

    &:last-child ${SubLevelNavigation} {
        left: auto;
        transform: none;
        right: 0;
    }
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${spacing.S100};
    height: 100%;
`;

const ToggleSubLevelNavigationButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    width: 20px;
    height: 20px;
`;

const AnimatedChevron = styled(SvgUse)<{ $isExpanded: boolean }>`
    width: 100%;
    height: 100%;
    color: ${({ theme, $isExpanded }) => ($isExpanded ? colors.primary.main : colors.text.primary)};
    transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
    transition: transform 0.4s ease;
`;

const MenuPageLink = styled(PageLink)`
    text-decoration: none;
    display: inline-block;
    padding: ${spacing.S100} 0;
    font-family: ${font.fontFamily};
    color: ${colors.text.primary};

    &:hover {
        color: ${colors.primary.main};
    }

    &.active {
        text-decoration: underline ${colors.primary.main};
        text-underline-offset: 8px;
    }
`;
