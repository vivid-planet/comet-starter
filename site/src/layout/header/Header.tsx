"use client";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { MobileMenu } from "@src/layout/header/MobileMenu";
import { PageLayout } from "@src/layout/PageLayout";
import Link from "next/link";
import { useIntl } from "react-intl";

import { DesktopMenu } from "./DesktopMenu";
import { type GQLHeaderFragment } from "./Header.fragment.generated";
import styles from "./Header.module.scss";

interface Props {
    header: GQLHeaderFragment[];
}
export const Header = ({ header }: Props) => {
    const intl = useIntl();

    return (
        <header>
            <PageLayout grid>
                <div className={styles.pageLayoutContent}>
                    <nav className={styles.root}>
                        <Link href="/" title={intl.formatMessage({ id: "header.logo.title", defaultMessage: "Comet DXP Logo" })}>
                            <SvgUse href="/assets/comet-logo.svg#root" />
                        </Link>
                        <DesktopMenu menu={header} />
                        <MobileMenu menu={header} />
                    </nav>
                </div>
            </PageLayout>
        </header>
    );
};
