import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";

import { Link } from "./links/Link";
import { Page } from "./pages/Page";

type DocumentType = { component: React.ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }> };

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
    },
    Link: {
        component: Link,
    },
};
