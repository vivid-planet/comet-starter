import * as Types from '../graphql.generated.js';

import type { FooterContentBlockData, LinkBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Query: {
    PrebuildPageDataListSitemap: 'PrebuildPageDataListSitemap'
  }
}
export type GQLPrebuildPageDataListSitemapQueryVariables = Types.Exact<{
  scope: Types.GQLPageTreeNodeScopeInput;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GQLPrebuildPageDataListSitemapQuery = { __typename?: 'Query', paginatedPageTreeNodes: { __typename?: 'PaginatedPageTreeNodes', totalCount: number, nodes: Array<{ __typename?: 'PageTreeNode', id: string, path: string, document: { __typename: 'Link' } | { __typename: 'Page', updatedAt: string, seo: SeoBlockData } | null }> } };
