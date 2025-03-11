import { type GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
// import { Metadata, ResolvingMetadata } from "next";
import { type ComponentType } from "react";
import { Request, Response as ExpressResponse } from "express";

import { Link, loader as loaderLink } from "./links/Link";
import { /*generateMetadata as generateMetadataPage, */Page, loader as loaderPage } from "./pages/Page";

type DocumentType = {
    component: ComponentType<{ loaderData: any}>;
    //generateMetadata?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }, parent: ResolvingMetadata) => Promise<Metadata>;
    loader?: (request: Request, response: ExpressResponse ) => Promise<any>;
};

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
        //generateMetadata: generateMetadataPage,
        loader: loaderPage
    },
    Link: {
        component: Link,
        loader: loaderLink
    },
};
