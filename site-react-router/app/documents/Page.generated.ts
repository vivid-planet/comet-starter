import * as Types from '../graphql.generated';

import { LinkBlockData, PageContentBlockData, SeoBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Query: {
    Page: 'Page'
  }
}
export type GQLPageQueryVariables = Types.Exact<{
  pageTreeNodeId: Types.Scalars['ID'];
}>;


export type GQLPageQuery = { __typename?: 'Query', pageContent: { __typename?: 'PageTreeNode', name: string, path: string, document: { __typename: 'Link' } | { __typename: 'Page', content: PageContentBlockData, seo: SeoBlockData } | null } | null };
