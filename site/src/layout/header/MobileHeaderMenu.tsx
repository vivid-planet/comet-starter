"use client";
import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { GQLHeaderFragment } from "./Header.fragment.generated";
import * as sc from "./MobileHeaderMenu.sc";

interface Props {
    header: GQLHeaderFragment[];
}

export const MobileHeaderMenu = ({ header }: Props) => {
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

    // prevent scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    }, [isMenuOpen]);

    return (
        <sc.Root>
            <sc.MenuButton aria-label="Menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
                <sc.Icon href={isMenuOpen ? "/assets/icons/menu-open.svg#menu-open" : "/assets/icons/menu.svg#menu"} />
            </sc.MenuButton>
            <sc.MenuContainer $isMenuOpen={isMenuOpen} aria-hidden={!isMenuOpen}>
                <PageLayout grid>
                    <sc.PageLayoutContent>
                        <nav>
                            <sc.TopLevelNavigation>
                                {header.map((node) => (
                                    <li key={node.id}>
                                        {node.childNodes.length > 0 ? (
                                            <sc.ButtonLink
                                                aria-label={`Submenu of ${node.name}`}
                                                aria-expanded={expandedSubLevelNavigation === node.id}
                                                onClick={() => handleSubLevelNavigationButtonClick(node.id)}
                                            >
                                                <Typography>{node.name}</Typography>
                                                <sc.IconWrapper>
                                                    <sc.Icon href="/assets/icons/arrow-right.svg#arrow-right" />
                                                </sc.IconWrapper>
                                            </sc.ButtonLink>
                                        ) : (
                                            <sc.Link page={node} aria-label={node.name}>
                                                {node.name}
                                            </sc.Link>
                                        )}
                                        {node.childNodes.length > 0 && (
                                            <sc.SubLevelNavigation $isExpanded={expandedSubLevelNavigation === node.id}>
                                                <PageLayout grid>
                                                    <sc.PageLayoutContent>
                                                        <li>
                                                            <sc.BackButton aria-label="Go back" onClick={() => setExpandedSubLevelNavigation(null)}>
                                                                <sc.IconWrapper>
                                                                    <sc.Icon href="/assets/icons/arrow-left.svg#arrow-left" />
                                                                </sc.IconWrapper>
                                                                <Typography>
                                                                    <FormattedMessage id="header.back" defaultMessage="Back" />
                                                                </Typography>
                                                            </sc.BackButton>
                                                        </li>
                                                        <li>
                                                            <sc.OverviewButton page={node} aria-label={node.name}>
                                                                <sc.IconWrapper>
                                                                    <sc.Icon href="/assets/icons/overview.svg#overview" />
                                                                </sc.IconWrapper>
                                                                <Typography>
                                                                    <FormattedMessage id="header.overview" defaultMessage="Overview" />
                                                                    {` | ${node.name}`}
                                                                </Typography>
                                                            </sc.OverviewButton>
                                                        </li>
                                                        {node.childNodes.map((node) => (
                                                            <li key={node.id}>
                                                                <sc.Link page={node} aria-label={node.name}>
                                                                    {node.name}
                                                                </sc.Link>
                                                            </li>
                                                        ))}
                                                    </sc.PageLayoutContent>
                                                </PageLayout>
                                            </sc.SubLevelNavigation>
                                        )}
                                    </li>
                                ))}
                            </sc.TopLevelNavigation>
                        </nav>
                    </sc.PageLayoutContent>
                </PageLayout>
            </sc.MenuContainer>
        </sc.Root>
    );
};
