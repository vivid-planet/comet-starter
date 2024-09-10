"use client";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import { DisableBodyScrolling } from "@src/util/DisableBodyScrolling";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled, { css } from "styled-components";

import { GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

const Header = ({ header }: Props) => {
    const intl = useIntl();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    const toggleMenu = () => {
        if (isMenuOpen) setExpandedSubLevelNavigation(null);
        setIsMenuOpen((prev) => !prev);
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

        const keyDownHandler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                setExpandedSubLevelNavigation(null);
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [expandedSubLevelNavigation]);

    return (
        <header>
            <PageLayout grid>
                <PageLayoutContent>
                    <Root>
                        <SvgUse href="/assets/comet-logo.svg#logo" />

                        <DesktopHeaderFullHeightNav>
                            <TopLevelNavigation>
                                {header.map((node) => (
                                    <TopLevelLinkContainer
                                        key={node.id}
                                        onMouseEnter={() => setExpandedSubLevelNavigation(node.id)}
                                        onMouseLeave={() => setExpandedSubLevelNavigation(null)}
                                    >
                                        <LinkContainer>
                                            <Link page={node} activeClassName="active" aria-label={node.name}>
                                                {node.name}
                                            </Link>
                                            {node.childNodes.length > 0 && (
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
                                        {node.childNodes.length > 0 && (
                                            <SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                                {node.childNodes.map((node) => (
                                                    <li key={node.id}>
                                                        <Link page={node} activeClassName="active" aria-label={node.name}>
                                                            {node.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </SubLevelNavigation>
                                        )}
                                    </TopLevelLinkContainer>
                                ))}
                            </TopLevelNavigation>
                        </DesktopHeaderFullHeightNav>

                        <MobileMenuContainer>
                            {isMenuOpen && <DisableBodyScrolling />}
                            <MenuButton
                                aria-label={intl.formatMessage({
                                    id: "header.menu.arialLabel",
                                    defaultMessage: "Menu",
                                })}
                                aria-expanded={isMenuOpen}
                                onClick={toggleMenu}
                            >
                                <Icon href={isMenuOpen ? "/assets/icons/menu-open.svg#menu-open" : "/assets/icons/menu.svg#menu"} />
                            </MenuButton>
                            <MenuContainer $isMenuOpen={isMenuOpen} aria-hidden={!isMenuOpen}>
                                <PageLayout grid>
                                    <PageLayoutContent>
                                        <nav>
                                            <MobileTopLevelNavigation>
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
                                                            <MobileSubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
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
                                                                                    <FormattedMessage
                                                                                        id="header.overview"
                                                                                        defaultMessage="Overview"
                                                                                    />
                                                                                    {` | ${node.name}`}
                                                                                </Typography>
                                                                            </OverviewButton>
                                                                        </li>
                                                                        {node.childNodes.map((node) => (
                                                                            <li key={node.id}>
                                                                                <MobileLink page={node} aria-label={node.name}>
                                                                                    {node.name}
                                                                                </MobileLink>
                                                                            </li>
                                                                        ))}
                                                                    </PageLayoutContent>
                                                                </PageLayout>
                                                            </MobileSubLevelNavigation>
                                                        )}
                                                    </li>
                                                ))}
                                            </MobileTopLevelNavigation>
                                        </nav>
                                    </PageLayoutContent>
                                </PageLayout>
                            </MenuContainer>
                        </MobileMenuContainer>
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
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["50"]};
`;

const DesktopHeaderFullHeightNav = styled.nav`
    height: 100%;
    display: none;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: block;
    }
`;

const TopLevelNavigation = styled.ol`
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: ${({ theme }) => theme.spacing.S600};
    height: 100%;
`;

const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.S200};
    position: absolute;
    z-index: 40;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    list-style-type: none;
    padding: ${({ theme }) => theme.spacing.D100};
    background-color: white;
    border-left: 1px solid ${({ theme }) => theme.palette.gray["200"]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["200"]};
    border-right: 1px solid ${({ theme }) => theme.palette.gray["200"]};
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
    gap: ${({ theme }) => theme.spacing.S100};
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
    color: ${({ theme, $isExpanded }) => ($isExpanded ? theme.palette.primary.main : theme.palette.text.primary)};
    transform: rotate(${({ $isExpanded }) => ($isExpanded ? "-180deg" : "0deg")});
    transition: transform 0.4s ease;
`;

const Link = styled(PageLink)`
    text-decoration: none;
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.S100} 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }

    &.active {
        text-decoration: underline ${({ theme }) => theme.palette.primary.main};
        text-underline-offset: 8px;
    }
`;

/* mobile menu styles */

const MobileMenuContainer = styled.div`
    ${({ theme }) => css`
        ${theme.breakpoints.sm.mediaQuery} {
            display: none;
        }
    `}
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
    color: inherit;
`;

const Icon = styled(SvgUse)`
    width: 100%;
    height: 100%;
    color: inherit;
`;

const MenuContainer = styled.div<{ $isMenuOpen: boolean }>`
    display: block;
    position: fixed;
    top: 100px;
    left: 0;
    height: 0;
    width: 100vw;
    z-index: 40;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    overflow: hidden;
    visibility: hidden;
    transition: height 0.15s ease-out, visibility 0s linear 0.15s;

    ${({ $isMenuOpen }) =>
        $isMenuOpen &&
        css`
            visibility: visible;
            height: calc(100vh - 100px);
            transition: height 0.25s ease-in;
        `}
`;

const MobileTopLevelNavigation = styled.ol`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const MobileSubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    list-style-type: none;
    position: fixed;
    top: 100px;
    left: 100vw;
    height: calc(100vh - 100px);
    width: 100vw;
    z-index: 41;
    background-color: ${({ theme }) => theme.palette.gray["200"]};
    padding: 0;
    overflow: hidden;
    visibility: hidden;
    transition: left 0.15s ease-out, visibility 0s linear 0.15s;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            visibility: visible;
            left: 0;
            transition: left 0.25s ease-in;
        `}
`;

const MobileLink = styled(PageLink)`
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

const ButtonLink = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

const BackButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S200};
    width: 100%;
    padding: ${({ theme }) => theme.spacing.S500} 0;
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray["300"]};

    &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
    }
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

export { Header };
