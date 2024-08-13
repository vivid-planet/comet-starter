import { gql, previewParams } from "@comet/cms-site";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./layout.generated";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default async function Layout({
    children,
    params: { domain, language },
}: PropsWithChildren<{ params: { domain: string; language: string } }>) {
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
        { domain, language },
    );

    return (
        <>
            <Header header={header} />
            {children}
        </>
    );
}
