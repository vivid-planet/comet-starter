import { gql } from "@comet/cms-site";
import { Footer } from "@src/layout/footer/Footer";
import { footerFragment } from "@src/layout/footer/Footer.fragment";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import type { Metadata } from "next";
import { type PropsWithChildren } from "react";

import { type GQLLayoutQuery, type GQLLayoutQueryVariables } from "./layout.generated";

interface LayoutProps {
    params: { domain: string; language: string };
}

export default async function Layout({ children, params: { domain, language } }: PropsWithChildren<LayoutProps>) {
    const graphqlFetch = createGraphQLFetch();

    const { header, footer } = await graphqlFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
        gql`
            query Layout($domain: String!, $language: String!) {
                header: mainMenu(scope: { domain: $domain, language: $language }) {
                    ...Header
                }
                footer: footer(scope: { domain: $domain, language: $language }) {
                    ...Footer
                }
            }
            ${headerFragment}
            ${footerFragment}
        `,
        { domain, language },
    );

    return (
        <>
            <Header header={header} />
            {children}
            {footer && <Footer footer={footer} />}
        </>
    );
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
    const siteConfig = getSiteConfigForDomain(params.domain);

    return {
        metadataBase: new URL(siteConfig.url),
    };
}
