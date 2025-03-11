"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLink } from "@src/layout/header/PageLink";
import { PageLayout } from "@src/layout/PageLayout";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";


import { type GQLHeaderFragment } from "./Header.fragment.generated";
import { IntlProvider, type Messages } from "@src/util/IntlProvider";
import Styles from "./Header.module.scss";

interface HeaderContextsWrapperProps extends Props{
    language: string;
    messages: Messages;

}
export const HeaderContextsWrapper = ({ header, language, messages }: HeaderContextsWrapperProps) => {
    return <IntlProvider locale={language} messages={messages}>
        <Header header={header} />
    </IntlProvider>;
};

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
                <div className={Styles.PageLayoutContent}>
                    <div className={Styles.Root}>
                        <a href="/">
                            <SvgUse href="/assets/comet-logo.svg#root" />
                        </a>

                        <nav className={Styles.DesktopHeaderFullHeightNav}>
                            <ol className={Styles.TopLevelNavigation}>
                                {header.map((node) => {
                                    const visibleChildNodes = node.childNodes.filter((node) => !node.hideInMenu);
                                    return (
                                        <li className={Styles.TopLevelLinkContainer}
                                            key={node.id}
                                            onMouseEnter={() => setExpandedSubLevelNavigation(node.id)}
                                            onMouseLeave={() => setExpandedSubLevelNavigation(null)}
                                        >
                                            <div className={Styles.LinkContainer}>
                                                <PageLink className={Styles.MenuPageLink} page={node} activeClassName="active" aria-label={node.name}>
                                                    {node.name}
                                                </PageLink>
                                                {visibleChildNodes.length > 0 && (
                                                    <button className={Styles.ToggleSubLevelNavigationButton}
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
                                                        <SvgUse className={Styles.AnimatedChevron + " " + (expandedSubLevelNavigation === node.id ? Styles["AnimatedChevron--expanded"] : "")}
                                                            href="/assets/icons/chevron-down.svg#root"
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                            {visibleChildNodes.length > 0 && (
                                                <ol className={Styles.SubLevelNavigation + " " + (expandedSubLevelNavigation === node.id ? Styles["SubLevelNavigation--expanded"] : "")}>
                                                    {visibleChildNodes.map((node) => (
                                                        <li key={node.id}>
                                                            <PageLink className={Styles.MenuPageLink} page={node} activeClassName="active" aria-label={node.name}>
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
