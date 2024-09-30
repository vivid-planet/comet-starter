import { gql, previewParams } from "@comet/cms-site";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";

import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./ServerSideHeader.generated";

export default async function ServerSideHeader({ domain, language }: { domain: string; language: string }) {
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

    return <Header header={header} />;
}
