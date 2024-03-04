import { gql } from "graphql-request";
import { Redirect, Rewrite } from "next/dist/lib/load-custom-routes";

import { ExternalLinkBlockData, InternalLinkBlockData, RedirectsLinkBlockData } from "../../src/blocks.generated";
import { createGraphQLClient } from "../../src/util/createGraphQLClient";
import { GQLRedirectsQuery, GQLRedirectsQueryVariables } from "./createRedirects.generated";

const createRedirects = async () => {
    const { rewrites, redirects } = await createApiRedirects();

    return { rewrites, redirects: [...redirects, ...(await createInternalRedirects())] };
};

const redirectsQuery = gql`
    query Redirects($filter: RedirectFilter, $sort: [RedirectSort!], $offset: Int!, $limit: Int!) {
        paginatedRedirects(filter: $filter, sort: $sort, offset: $offset, limit: $limit) {
            nodes {
                sourceType
                source
                target
            }
            totalCount
        }
    }
`;

async function* getRedirects() {
    let offset = 0;
    const limit = 100;

    while (true) {
        const { paginatedRedirects } = await createGraphQLClient().request<GQLRedirectsQuery, GQLRedirectsQueryVariables>(redirectsQuery, {
            filter: { active: { equal: true } },
            sort: { field: "createdAt", direction: "DESC" },
            offset,
            limit,
        });

        yield* paginatedRedirects.nodes;

        if (offset + limit >= paginatedRedirects.totalCount) {
            break;
        }

        offset += limit;
    }
}

const createInternalRedirects = async (): Promise<Redirect[]> => {
    return [
        {
            source: "/admin",
            destination: process.env.ADMIN_URL!,
            permanent: false,
        },
    ];
};
const createApiRedirects = async (): Promise<{ redirects: Redirect[]; rewrites: Rewrite[] }> => {
    const apiUrl = process.env.API_URL_INTERNAL;
    if (!apiUrl) {
        console.error("No Environment Variable API_URL_INTERNAL available. Can not perform redirect config");
        return { redirects: [], rewrites: [] };
    }

    const redirects: Redirect[] = [];
    const rewrites: Rewrite[] = [];

    for await (const redirect of getRedirects()) {
        let source: string | undefined;
        let destination: string | undefined;

        if (redirect.sourceType === "path") {
            source = redirect.source;
        }

        const target = redirect.target as RedirectsLinkBlockData;

        if (target.block !== undefined) {
            switch (target.block.type) {
                case "internal":
                    destination = (target.block.props as InternalLinkBlockData).targetPage?.path;
                    break;

                case "external":
                    destination = (target.block.props as ExternalLinkBlockData).targetUrl;
                    break;
            }
        }

        if (source === destination) {
            console.warn(`Skipping redirect loop ${source} -> ${destination}`);
            continue;
        }

        if (source && destination) {
            if (source.toLowerCase() === destination.toLowerCase()) {
                const newSource = source
                    .split("")
                    .map((char) => (char.toLowerCase() === char.toUpperCase() ? char : `(${char.toLowerCase()}|${char.toUpperCase()})`))
                    .join("");
                rewrites.push({ source: newSource, destination });
            } else {
                redirects.push({ source, destination, permanent: true });
            }
        }
    }

    return { redirects, rewrites };
};

export { createRedirects };
