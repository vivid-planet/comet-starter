"use client";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import { DisableBodyScrolling } from "@src/util/DisableBodyScrolling";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { css } from "styled-components";

import { GQLMobileMenuFragment } from "./MobileMenu.fragment.generated";

interface Props {
    header: GQLMobileMenuFragment[];
}

export const MobileMenu = ({ header }: Props) => {
    const intl = useIntl();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    const handleMenuButtonClick = () => {
        if (isMenuOpen) {
            setExpandedSubLevelNavigation(null);
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    };

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
        <Root>
            {isMenuOpen && <DisableBodyScrolling />}
            <MenuButton
                aria-label={intl.formatMessage({
                    id: "header.menu.arialLabel",
                    defaultMessage: "Menu",
                })}
                aria-expanded={isMenuOpen}
                onClick={handleMenuButtonClick}
            >
                <Icon href={isMenuOpen ? "/assets/icons/menu-open.svg#menu-open" : "/assets/icons/menu.svg#menu"} />
            </MenuButton>
            <MenuContainer $isMenuOpen={isMenuOpen} aria-hidden={!isMenuOpen}>
                <PageLayout grid>
                    <PageLayoutContent>
                        <nav>
                            <TopLevelNavigation>
                                {header.map((node) => (
                                    <li key={node.id}>
                                        {node.childNodes.length > 0 ? (
                                            <ButtonLink
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
                                                <Typography>{node.name}</Typography>
                                                <IconWrapper>
                                                    <Icon href="/assets/icons/arrow-right.svg#arrow-right" />
                                                </IconWrapper>
                                            </ButtonLink>
                                        ) : (
                                            <Link page={node} aria-label={node.name}>
                                                {node.name}
                                            </Link>
                                        )}
                                        {node.childNodes.length > 0 && (
                                            <SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                                <PageLayout grid>
                                                    <PageLayoutContent>
                                                        <li>
                                                            <BackButton
                                                                aria-label={intl.formatMessage({
                                                                    id: "header.backButton.arialLabel",
                                                                    defaultMessage: "Go back",
                                                                })}
                                                                onClick={() => setExpandedSubLevelNavigation(null)}
                                                            >
                                                                <IconWrapper>
                                                                    <Icon href="/assets/icons/arrow-left.svg#arrow-left" />
                                                                </IconWrapper>
                                                                <Typography>
                                                                    <FormattedMessage id="header.back" defaultMessage="Back" />
                                                                </Typography>
                                                            </BackButton>
                                                        </li>
                                                        <li>
                                                            <OverviewButton page={node} aria-label={node.name}>
                                                                <IconWrapper>
                                                                    <Icon href="/assets/icons/overview.svg#overview" />
                                                                </IconWrapper>
                                                                <Typography>
                                                                    <FormattedMessage id="header.overview" defaultMessage="Overview" />
                                                                    {` | ${node.name}`}
                                                                </Typography>
                                                            </OverviewButton>
                                                        </li>
                                                        {node.childNodes.map((node) => (
                                                            <li key={node.id}>
                                                                <Link page={node} aria-label={node.name}>
                                                                    {node.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </PageLayoutContent>
                                                </PageLayout>
                                            </SubLevelNavigation>
                                        )}
                                    </li>
                                ))}
                            </TopLevelNavigation>
                        </nav>
                    </PageLayoutContent>
                </PageLayout>
            </MenuContainer>
        </Root>
    );
};

const Root = styled.div`
    ${({ theme }) => css`
        ${theme.breakpoints.sm.mediaQuery} {
            display: none;
        }
    `}
`;

const PageLayoutContent = styled.div`
    grid-column: 2 / -2;
`;

const MenuButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    width: 24px;
    height: 24px;
`;

const IconWrapper = styled.div`
    width: 16px;
    height: 16px;
`;

const Icon = styled(SvgUse)`
    width: 100%;
    height: 100%;
    color: inherit;
`;

const MenuContainer = styled.div<{ $isMenuOpen: boolean }>`
    display: block;
    position: fixed;
    top: var(--header-height);
    left: 0;
    height: 0;
    width: 100vw;
    z-index: 40;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    overflow: auto;
    visibility: hidden;
    transition: height 0.15s ease-out, visibility 0s linear 0.15s;

    ${({ $isMenuOpen }) =>
        $isMenuOpen &&
        css`
            visibility: visible;
            height: calc(100vh - var(--header-height));
            transition: height 0.25s ease-in;
        `}
`;

const TopLevelNavigation = styled.ol`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    list-style-type: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    height: calc(100vh - var(--header-height));
    width: 100vw;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    padding: 0;
    overflow: auto;
    visibility: hidden;
    transform: translateX(100%);
    transition: transform 0.2s ease-out, visibility 0s linear 0.2s;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            visibility: visible;
            transform: translateX(0);
            transition: transform 0.2s ease-in;
        `}
`;

const Link = styled(PageLink)`
    width: 100%;
    text-decoration: none;
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

const ButtonLinkBase = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    gap: ${({ theme }) => theme.spacing.S200};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

const ButtonLink = styled(ButtonLinkBase)`
    justify-content: space-between;
`;

const BackButton = styled(ButtonLinkBase)`
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["300"]};
`;

const OverviewButton = styled(PageLink)`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S200};
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;
