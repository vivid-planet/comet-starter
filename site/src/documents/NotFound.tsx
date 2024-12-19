"use client";

import { Typography } from "@src/common/components/Typography";
import { colors, font, spacing } from "@src/constants.yak";
import { PageLayout } from "@src/layout/PageLayout";
import type { ContentScope } from "@src/site-configs";
import Link from "next/link";
import { styled } from "next-yak";
import { FormattedMessage } from "react-intl";

export default function NotFoundContent({ scope }: { scope: ContentScope }) {
    return (
        <PageLayout grid>
            <PageLayoutContent>
                <NotFoundTypography variant="h350">
                    <FormattedMessage id="notFound.pageNotFound" defaultMessage="Page not found." />
                </NotFoundTypography>
                <HomeLink href={`/${scope.language}`}>
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
    margin-top: ${spacing.S300};
    margin-bottom: ${spacing.S300};
`;

const HomeLink = styled(Link)`
    text-decoration: none;
    display: inline-block;
    padding: ${spacing.S100} 0;
    font-family: ${font.fontFamily};
    color: ${colors.text.primary};

    &:hover {
        color: ${colors.primary.main};
    }

    &.active {
        text-decoration: underline ${colors.primary.main};
        text-underline-offset: 8px;
    }
`;
