import * as Types from '../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Query: {
    DocumentType: 'DocumentType'
  }
}
export type GQLDocumentTypeQueryVariables = Types.Exact<{
  path: Types.Scalars['String'];
  scope: Types.GQLPageTreeNodeScopeInput;
  redirectSource: Types.Scalars['String'];
  redirectScope: Types.GQLRedirectScopeInput;
}>;


export type GQLDocumentTypeQuery = { __typename?: 'Query', pageTreeNodeByPath: { __typename?: 'PageTreeNode', id: string, documentType: string } | null, redirectBySource: { __typename?: 'Redirect', target: any } | null };
