import { gql } from "@comet/cms-site";
import { Footer } from "@src/layout/footer/Footer";
import { footerFragment } from "@src/layout/footer/Footer.fragment";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { PropsWithChildren } from "react";

import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./Layout.generated";
import { RootLayout } from "./RootLayout";

interface LayoutProps {
    domain: string;
    language: string;
}

export async function Layout({ children, domain, language }: PropsWithChildren<LayoutProps>) {
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
        <RootLayout domain={domain} language={language}>
            <Header header={header} />
            {children}
            {footer && <Footer footer={footer} />}
        </RootLayout>
    );
}
