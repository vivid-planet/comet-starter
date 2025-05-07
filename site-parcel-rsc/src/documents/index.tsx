import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { ComponentType } from "react";

import { Link } from "./links/Link";
import { Page } from "./pages/Page";

type DocumentType = {
    component: ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }>;
};

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
    },
    Link: {
        component: Link,
    },
};
