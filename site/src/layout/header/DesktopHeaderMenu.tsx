"use client";
import { useEffect, useState } from "react";

import * as sc from "./DesktopHeaderMenu.sc";
import { GQLHeaderFragment } from "./Header.fragment.generated";

interface Props {
    header: GQLHeaderFragment[];
}

export const DesktopHeaderMenu = ({ header }: Props) => {
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
        <sc.FullHeightNav>
            <sc.TopLevelNavigation>
                {header.map((node) => (
                    <sc.TopLevelLinkContainer
                        key={node.id}
                        onMouseEnter={() => setExpandedSubLevelNavigation(node.id)}
                        onMouseLeave={() => setExpandedSubLevelNavigation(null)}
                    >
                        <sc.LinkContainer>
                            <sc.Link page={node} activeClassName="active" aria-label={node.name}>
                                {node.name}
                            </sc.Link>
                            {node.childNodes.length > 0 && (
                                <sc.ToggleSubLevelNavigationButton
                                    aria-label={`Submenu of ${node.name}`}
                                    aria-expanded={expandedSubLevelNavigation === node.id}
                                    onClick={() => handleSubLevelNavigationButtonClick(node.id)}
                                >
                                    <sc.AnimatedChevron
                                        href="/assets/icons/chevron-down.svg#chevron-down"
                                        $isExpanded={expandedSubLevelNavigation === node.id}
                                    />
                                </sc.ToggleSubLevelNavigationButton>
                            )}
                        </sc.LinkContainer>
                        {node.childNodes.length > 0 && (
                            <sc.SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                {node.childNodes.map((node) => (
                                    <li key={node.id}>
                                        <sc.Link page={node} activeClassName="active" aria-label={node.name}>
                                            {node.name}
                                        </sc.Link>
                                    </li>
                                ))}
                            </sc.SubLevelNavigation>
                        )}
                    </sc.TopLevelLinkContainer>
                ))}
            </sc.TopLevelNavigation>
        </sc.FullHeightNav>
    );
};
