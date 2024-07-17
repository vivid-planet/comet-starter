import { gql, previewParams } from "@comet/cms-site";
import { getSiteConfig } from "@src/config";
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
    const domain = (await getSiteConfig()).public.domain;

    const { previewData } = (await previewParams()) || { previewData: undefined };
    const graphqlFetch = createGraphQLFetch(previewData);

    const { header } = await graphqlFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
        gql`
            query Layout($domain: String!, $language: String!) {
                header: mainMenu(scope: { domain: $domain, language: $language }) {
                    ...Header
                }
            }

            ${headerFragment}
        `,
        { domain: domain, language: params.lang },
    );

    return (
        <>
            <Header header={header} />
            {children}
        </>
    );
}
