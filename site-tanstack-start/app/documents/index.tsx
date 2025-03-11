import { type GQLPageTreeNodeScopeInput } from "@app/graphql.generated";
// import { Metadata, ResolvingMetadata } from "next";
import { type ComponentType } from "react";

import { Link } from "./links/Link";
import { /*generateMetadata as generateMetadataPage, */Page, loader as loaderPage } from "./pages/Page";

type DocumentType = {
    component: ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }>;
    //generateMetadata?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }, parent: ResolvingMetadata) => Promise<Metadata>;
    loader?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput; request: Request }) => Promise<any>;
};

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
        //generateMetadata: generateMetadataPage,
        loader: loaderPage
    },
    Link: {
        component: Link,
    },
};
