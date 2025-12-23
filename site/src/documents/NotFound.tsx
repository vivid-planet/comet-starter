"use client";

import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import type { ContentScope } from "@src/site-configs";
import { createSitePath } from "@src/util/createSitePath";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import styles from "./NotFound.module.scss";

export const NotFoundContent = ({ scope }: { scope: ContentScope }) => {
    return (
        <PageLayout grid>
            <div className={styles.pageLayoutContent}>
                <Typography className={styles.title} variant="headline350">
                    <FormattedMessage id="notFound.pageNotFound" defaultMessage="Page not found." />
                </Typography>
                <Link className={styles.homeLink} href={createSitePath({ scope: scope, path: "/" })}>
                    <FormattedMessage id="notFound.returnHome" defaultMessage="Return home" />
                </Link>
            </div>
        </PageLayout>
    );
};
