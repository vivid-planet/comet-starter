import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { Metadata, ResolvingMetadata } from "next";

import { Link } from "./links/Link";
import { generateMetadata as generateMetadataPage, Page } from "./pages/Page";

type DocumentType = {
    component: React.ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }>;
    generateMetadata?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }, parent: ResolvingMetadata) => Promise<Metadata>;
};

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
        generateMetadata: generateMetadataPage,
    },
    Link: {
        component: Link,
    },
};
