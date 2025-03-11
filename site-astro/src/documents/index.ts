import { type GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
// import { Metadata, ResolvingMetadata } from "next";
import { type ComponentType } from "react";

import { Link } from "./links/Link";
import Page from "./pages/Page.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js"; // TODO is this path correct?

type DocumentType = {
    component: AstroComponentFactory;
    //generateMetadata?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }, parent: ResolvingMetadata) => Promise<Metadata>;
    //loader?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput; request: Request }) => Promise<any>;
};

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
        //generateMetadata: generateMetadataPage,
    },
    /*
    Link: {
        component: Link,
    },
    */
};
