"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { type GQLHeaderFragment } from "./Header.fragment.generated";
import styles from "./Header.module.scss";

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
                <div className={styles.pageLayoutContent}>
                    <div className={styles.root}>
                        <Link href="/">
                            <SvgUse href="/assets/comet-logo.svg#root" />
                        </Link>

                        <nav className={styles.desktopHeaderFullHeightNav}>
                            <ol className={styles.topLevelNavigation}>
                                {header.map((node) => {
                                    const visibleChildNodes = node.childNodes.filter((node) => !node.hideInMenu);
                                    return (
                                        <li
                                            key={node.id}
                                            className={styles.topLevelLinkContainer}
                                            onMouseEnter={() => setExpandedSubLevelNavigation(node.id)}
                                            onMouseLeave={() => setExpandedSubLevelNavigation(null)}
                                        >
                                            <div className={styles.linkContainer}>
                                                <PageLink
                                                    page={node}
                                                    className={styles.menuPageLink}
                                                    activeClassName={styles.active}
                                                    aria-label={node.name}
                                                >
                                                    {node.name}
                                                </PageLink>
                                                {visibleChildNodes.length > 0 && (
                                                    <button
                                                        className={styles.toggleSubLevelNavigationButton}
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
                                                        <SvgUse
                                                            href="/assets/icons/chevron-down.svg#root"
                                                            className={clsx(styles.animatedChevron, {
                                                                [styles.expanded]: expandedSubLevelNavigation === node.id,
                                                            })}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                            {visibleChildNodes.length > 0 && (
                                                <ol
                                                    className={clsx(styles.subLevelNavigation, {
                                                        [styles.expanded]: expandedSubLevelNavigation === node.id,
                                                    })}
                                                >
                                                    {visibleChildNodes.map((node) => (
                                                        <li key={node.id}>
                                                            <PageLink
                                                                page={node}
                                                                className={styles.menuPageLink}
                                                                activeClassName={styles.active}
                                                                aria-label={node.name}
                                                            >
                                                                {node.name}
                                                            </PageLink>
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>

                        <MobileMenu header={header} />
                    </div>
                </div>
            </PageLayout>
        </header>
    );
};
