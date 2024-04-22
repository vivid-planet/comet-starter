import { Link } from "./links/Link";
import { Page } from "./pages/Page";

// TODO fix type for async component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DocumentType = any; //{ component: React.ComponentType<{ pageTreeNodeId: string; scope: GQLPageTreeNodeScopeInput }> };

export const documentTypes: Record<string, DocumentType> = {
    Page: {
        component: Page,
    },
    Link: {
        component: Link,
    },
};
