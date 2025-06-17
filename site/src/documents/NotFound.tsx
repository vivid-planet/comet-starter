"use client";

import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import type { ContentScope } from "@src/site-configs";
import { createSitePath } from "@src/util/createSitePath";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export default function NotFoundContent({ scope }: { scope: ContentScope }) {
    return (
        <PageLayout grid>
            <PageLayoutContent>
                <NotFoundTypography variant="h350">
                    <FormattedMessage id="notFound.pageNotFound" defaultMessage="Page not found." />
                </NotFoundTypography>
                <HomeLink
                    href={createSitePath({
                        scope: scope,
                        path: "/",
                    })}
                >
                    <FormattedMessage id="notFound.returnHome" defaultMessage="Return home" />
                </HomeLink>
            </PageLayoutContent>
        </PageLayout>
    );
}

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;

const NotFoundTypography = styled(Typography)`
    margin-top: ${({ theme }) => theme.spacing.S300};
    margin-bottom: ${({ theme }) => theme.spacing.S300};
`;

const HomeLink = styled(Link)`
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
