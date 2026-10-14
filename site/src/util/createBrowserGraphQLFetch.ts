import { createPersistedQueryGraphQLFetch, type GraphQLFetch } from "@dextinity/site-react";

/**
 * GraphQL client for the browser. Only persisted queries (see framework/vite/persistedQueriesPlugin.ts) can be executed via the /graphql route.
 */
export function createBrowserGraphQLFetch({ fetch: passedFetch }: { fetch?: typeof fetch } = {}): GraphQLFetch {
    return createPersistedQueryGraphQLFetch(passedFetch || fetch, "/graphql");
}
