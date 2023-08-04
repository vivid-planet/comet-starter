import { gql, GraphQLClient } from "graphql-request";
import * as React from "react";

import { Header, headerFragment } from "./header/Header";
import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./Layout.generated";

function Layout({ children, header }: React.PropsWithChildren<GQLLayoutQuery>): JSX.Element {
    return (
        <>
            <Header header={header} />
            {children}
        </>
    );
}

const layoutCache = new Map<string, GQLLayoutQuery>();

async function getLayout(client: GraphQLClient, scope: { domain: string; language: string }): Promise<GQLLayoutQuery> {
    // We only want to cache the layout query during the site build (= SSG), but not SSR or ISR. This can be achieved by checking for the NEXT_PHASE
    // environment variable, which is only set when running `next build`.
    if (process.env.NEXT_PHASE === "phase-production-build") {
        const cacheKey = `${scope.domain}-${scope.language}`;

        const cachedLayout = layoutCache.get(cacheKey);

        if (cachedLayout !== undefined) {
            return cachedLayout;
        }

        const layout = await fetchLayout(client, scope);

        layoutCache.set(cacheKey, layout);

        return layout;
    } else {
        return fetchLayout(client, scope);
    }
}

async function fetchLayout(client: GraphQLClient, scope: { domain: string; language: string }): Promise<GQLLayoutQuery> {
    return client.request<GQLLayoutQuery, GQLLayoutQueryVariables>(
        gql`
            query Layout($domain: String!, $language: String!) {
                header: mainMenu(scope: { domain: $domain, language: $language }) {
                    ...Header
                }
            }

            ${headerFragment}
        `,
        { ...scope },
    );
}

export { getLayout, Layout };
export type PropsWithLayout<P> = P & { layout: GQLLayoutQuery };
