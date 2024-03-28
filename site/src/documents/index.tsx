import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { GraphQLClient } from "graphql-request";
import * as React from "react";

import { loader as pageTypePageLoader, Page as PageTypePage } from "./Page";

export type DocumentTypeLoaderOptions = { client: GraphQLClient; pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput };
export type InferDocumentTypeLoaderPropsType<T> = T extends (options: DocumentTypeLoaderOptions) => Promise<infer Return> ? Return : never;

type DocumentLoader<T = Record<string, unknown>> = (options: DocumentTypeLoaderOptions) => Promise<T>;
type DocumentType<T = Record<string, unknown>> = { component: React.ComponentType<T>; loader: DocumentLoader<T> };

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        loader: pageTypePageLoader,
        component: PageTypePage,
    },
};
