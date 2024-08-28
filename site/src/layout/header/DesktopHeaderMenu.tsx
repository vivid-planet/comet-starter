"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { GQLHeaderFragment } from "./Header.fragment.generated";
import { PageLink } from "./PageLink";

interface Props {
    header: GQLHeaderFragment[];
}

const DesktopHeaderMenu = ({ header }: Props) => {
    const [expandedSubLevelNavigation, setExpandedSubLevelNavigation] = useState<string | null>(null);

    const onExpandSubLevelNavigation = (id: string) => {
        if (expandedSubLevelNavigation === id) {
            setExpandedSubLevelNavigation(null);
        } else {
            setExpandedSubLevelNavigation(id);
        }
    };

    useEffect(() => {
        if (!expandedSubLevelNavigation) return;

        const keyDownHandler = (e: KeyboardEvent) => {
            if (expandedSubLevelNavigation && e.key === "Escape") {
                e.preventDefault();
                setExpandedSubLevelNavigation(null);
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [expandedSubLevelNavigation]);

    return (
        <FullHeightNav>
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
                                <IconButton
                                    aria-label={`Submenu of ${node.name}`}
                                    aria-expanded={expandedSubLevelNavigation === node.id}
                                    onClick={() => onExpandSubLevelNavigation(node.id)}
                                >
                                    <AnimatedChevron
                                        href="/assets/icons/chevron-down.svg#chevron-down"
                                        $isExpanded={expandedSubLevelNavigation === node.id}
                                    />
                                </IconButton>
                            )}
                        </LinkContainer>
                        {node.childNodes.length > 0 && (
                            <SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                {node.childNodes.map((node) => (
                                    <SubLevelLinkContainer key={node.id}>
                                        <Link page={node} activeClassName="active" aria-label={node.name}>
                                            {node.name}
                                        </Link>
                                    </SubLevelLinkContainer>
                                ))}
                            </SubLevelNavigation>
                        )}
                    </TopLevelLinkContainer>
                ))}
            </TopLevelNavigation>
        </FullHeightNav>
    );
};

const FullHeightNav = styled.nav`
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
    z-index: 10;
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

const SubLevelLinkContainer = styled.li`
    position: relative;
`;

const IconButton = styled.button`
    appearance: none;
    border: none;
    background-color: transparent;
    color: inherit;
    padding: 0;
    width: 20px;
    height: 20px;
    display: inline-block;
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

export { DesktopHeaderMenu };
