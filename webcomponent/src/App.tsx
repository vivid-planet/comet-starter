import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import { Page } from "@src/components/Page";
import * as React from "react";
import { StyleSheetManager } from "styled-components";

interface AppProps {
    styleSlot?: HTMLElement;
}

export const App: React.FunctionComponent<AppProps> = ({ styleSlot }) => {
    const httpLink = new HttpLink({
        uri: `http://localhost:4000/api/graphql`,
    });

    const link = ApolloLink.from([httpLink]);

    const cache = new InMemoryCache();

    const apolloClient = new ApolloClient({
        link,
        cache,
    });

    return (
        <StyleSheetManager target={styleSlot}>
            <ApolloProvider client={apolloClient}>
                <Page />
            </ApolloProvider>
        </StyleSheetManager>
    );
};
