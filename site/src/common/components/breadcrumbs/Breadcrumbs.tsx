"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { Link } from "@src/framework/client/Link";
import { PageLayout } from "@src/layout/PageLayout";
import { createSitePath } from "@src/util/createSitePath";
import clsx from "clsx";
import { useId, useState } from "react";
import ReactFocusLock from "react-focus-lock";
import { FormattedMessage } from "react-intl";

import type { GQLBreadcrumbsFragment } from "./Breadcrumbs.fragment.generated";
import styles from "./Breadcrumbs.module.scss";

export const Breadcrumbs = ({ scope, name, path, parentNodes }: GQLBreadcrumbsFragment) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const listId = useId();

    return (
        <PageLayout grid className={styles.root}>
            <button className={styles.mobileHomeButton} onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded} aria-controls={listId}>
                {name}
                <SvgUse
                    className={clsx(styles.mobileChevron, isExpanded && styles["mobileChevron--expanded"])}
                    href="/assets/icons/chevron-down.svg#root"
                    width={16}
                    height={16}
                />
            </button>
            {parentNodes.length > 0 && (
                <ReactFocusLock className={clsx(styles.listContainer, isExpanded && styles["listContainer--expanded"])} disabled={!isExpanded}>
                    <ol className={styles.list} id={listId}>
                        <li className={styles.mobileNavigationListElements}>
                            <button className={styles.mobileBackButton} onClick={() => setIsExpanded(false)}>
                                <SvgUse href="/assets/icons/arrow-left.svg#root" width={16} height={16} color="inherit" />
                                <FormattedMessage id="header.closeBreadcrumbs" defaultMessage="Close Breadcrumbs" />
                            </button>
                        </li>
                        <li className={clsx(styles.mobileNavigationListElements, styles.linkContainer)} style={{ "--breadcrumb-level": 0 }}>
                            <Link className={styles.link} href={createSitePath({ path: "/", scope })}>
                                <FormattedMessage id="header.breadcrumbs.home" defaultMessage="Home" />
                            </Link>
                        </li>
                        {parentNodes.map((parentNode, index) => (
                            <li
                                key={parentNode.path}
                                className={clsx(styles.listElement, isExpanded && styles.linkContainer)}
                                style={{ "--breadcrumb-level": index + 1 }}
                            >
                                <SvgUse
                                    href="/assets/icons/corner-down-right.svg#root"
                                    className={clsx(styles.mobileCornerDownRightIcon, styles["link--active"])}
                                    width={16}
                                    height={16}
                                />
                                <Link
                                    className={styles.link}
                                    href={createSitePath({
                                        path: parentNode.path,
                                        scope,
                                    })}
                                >
                                    {parentNode.name}
                                </Link>
                                <SvgUse href="/assets/icons/chevron-down.svg#root" className={styles.chevron} width={16} height={16} />
                            </li>
                        ))}
                        <li
                            className={clsx(styles.listElement, isExpanded && styles.linkContainer)}
                            style={{ "--breadcrumb-level": parentNodes.length + 1 }}
                        >
                            <SvgUse
                                href="/assets/icons/corner-down-right.svg#root"
                                className={clsx(styles.mobileCornerDownRightIcon, styles["link--active"])}
                                width={16}
                                height={16}
                            />
                            <Link
                                className={clsx(styles.link, styles["link--active"])}
                                href={createSitePath({
                                    path: path,
                                    scope,
                                })}
                            >
                                {name}
                            </Link>
                        </li>
                    </ol>
                </ReactFocusLock>
            )}
        </PageLayout>
    );
};
