import { gql, previewParams } from "@comet/cms-site";
import { domain } from "@src/config";
import { Footer } from "@src/layout/footer/Footer";
import { footerFragment } from "@src/layout/footer/Footer.fragment";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./layout.generated";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function Layout({ children, params }: PropsWithChildren<{ params: { lang: string } }>) {
    // TODO support multiple domains, get domain by Host header
    const { scope, previewData } = (await previewParams()) || { scope: { domain, language: params.lang }, previewData: undefined };
    const graphQLFetch = createGraphQLFetch(previewData);

    const { header, footer } = await graphQLFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
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
        { domain: scope.domain, language: scope.language },
    );

    return (
        <>
            <Header header={header} />
            {children}
            {footer && <Footer footer={footer} />}
        </>
    );
}
