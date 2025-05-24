"use client";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import { DisableBodyScrolling } from "@src/util/DisableBodyScrolling";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { type GQLMobileMenuFragment } from "./MobileMenu.fragment.generated";
import styles from "./MobileMenu.module.scss";

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
        <div className={styles.root}>
            {isMenuOpen && <DisableBodyScrolling />}
            <button
                className={styles.menuButton}
                aria-label={intl.formatMessage({
                    id: "header.menu.arialLabel",
                    defaultMessage: "Menu",
                })}
                aria-expanded={isMenuOpen}
                onClick={handleMenuButtonClick}
            >
                <SvgUse className={styles.icon} href={isMenuOpen ? "/assets/icons/menu-open.svg#root" : "/assets/icons/menu.svg#root"} />
            </button>
            <div className={clsx(styles.menuContainer, isMenuOpen && styles.open)} aria-hidden={!isMenuOpen}>
                <PageLayout grid>
                    <div className={styles.pageLayoutContent}>
                        <nav>
                            <ol className={styles.topLevelNavigation}>
                                {header.map((node) => {
                                    const visibleChildNodes = node.childNodes.filter((node) => !node.hideInMenu);
                                    return (
                                        <li key={node.id}>
                                            {visibleChildNodes.length > 0 ? (
                                                <button
                                                    className={styles.buttonLink}
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
                                                    <div className={styles.iconWrapper}>
                                                        <SvgUse className={styles.icon} href="/assets/icons/arrow-right.svg#root" />
                                                    </div>
                                                </button>
                                            ) : (
                                                <PageLink className={styles.link} page={node} aria-label={node.name}>
                                                    {node.name}
                                                </PageLink>
                                            )}
                                            {visibleChildNodes.length > 0 && (
                                                <ol
                                                    className={clsx(
                                                        styles.subLevelNavigation,
                                                        expandedSubLevelNavigation === node.id && styles.expanded,
                                                    )}
                                                >
                                                    <PageLayout grid>
                                                        <div className={styles.pageLayoutContent}>
                                                            <li>
                                                                <button
                                                                    className={styles.backButton}
                                                                    aria-label={intl.formatMessage({
                                                                        id: "header.backButton.arialLabel",
                                                                        defaultMessage: "Go back",
                                                                    })}
                                                                    onClick={() => setExpandedSubLevelNavigation(null)}
                                                                >
                                                                    <div className={styles.iconWrapper}>
                                                                        <SvgUse className={styles.icon} href="/assets/icons/arrow-left.svg#root" />
                                                                    </div>
                                                                    <Typography>
                                                                        <FormattedMessage id="header.back" defaultMessage="Back" />
                                                                    </Typography>
                                                                </button>
                                                            </li>
                                                            <li>
                                                                <PageLink className={styles.overviewButton} page={node} aria-label={node.name}>
                                                                    <div className={styles.iconWrapper}>
                                                                        <SvgUse className={styles.icon} href="/assets/icons/overview.svg#root" />
                                                                    </div>
                                                                    <Typography>
                                                                        <FormattedMessage id="header.overview" defaultMessage="Overview" />
                                                                        {` | ${node.name}`}
                                                                    </Typography>
                                                                </PageLink>
                                                            </li>
                                                            {visibleChildNodes.map((node) => (
                                                                <li key={node.id}>
                                                                    <PageLink className={styles.link} page={node} aria-label={node.name}>
                                                                        {node.name}
                                                                    </PageLink>
                                                                </li>
                                                            ))}
                                                        </div>
                                                    </PageLayout>
                                                </ol>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                    </div>
                </PageLayout>
            </div>
        </div>
    );
};
