"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

import { type GQLDesktopMenuFragment } from "./DesktopMenu.fragment.generated";
import { PageLink } from "./PageLink";

interface Props {
    header: GQLDesktopMenuFragment[];
}

export const DesktopMenu = ({ header }: Props) => {
    const intl = useIntl();
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    const handleSubLevelNavigationButtonClick = (id: string) => {
        if (expandedSubLevelNavigation === id) {
            setExpandedSubLevelNavigation(null);
        } else {
            setExpandedSubLevelNavigation(id);
        }
    };

    return (
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
                                <MenuPageLink page={node} activeClassName="active">
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
                                            href="/assets/icons/chevron-down.svg#root"
                                            $isExpanded={expandedSubLevelNavigation === node.id}
                                        />
                                    </ToggleSubLevelNavigationButton>
                                )}
                            </LinkContainer>
                            {visibleChildNodes.length > 0 && (
                                <SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                    {visibleChildNodes.map((node) => (
                                        <li key={node.id}>
                                            <MenuPageLink page={node} activeClassName="active">
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
    );
};

const DesktopHeaderFullHeightNav = styled.nav`
    height: 100%;
    display: none;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: block;
    }
`;

const TopLevelNavigation = styled.ol`
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: ${({ theme }) => theme.spacing.s600};
    height: 100%;
`;

const SubLevelNavigation = styled.ol<{ $isExpanded: boolean }>`
    display: ${({ $isExpanded }) => ($isExpanded ? "flex" : "none")};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.s200};
    position: absolute;
    z-index: 40;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    list-style-type: none;
    padding: ${({ theme }) => theme.spacing.d100};
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
    gap: ${({ theme }) => theme.spacing.s100};
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

const MenuPageLink = styled(PageLink)`
    text-decoration: none;
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.s100} 0;
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
