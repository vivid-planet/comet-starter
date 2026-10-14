import type { Metadata } from "@src/framework/metadata";
import type { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import type { ComponentType } from "react";

import { Link } from "./links/Link";
import { generateMetadata as generateMetadataPage, Page } from "./pages/Page";

type DocumentType = {
    component: ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }>;
    generateMetadata?: (props: { pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }) => Promise<Metadata>;
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
