import * as Types from '../../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Query: {
    Page: 'Page'
  }
}
export type GQLPageQueryVariables = Types.Exact<{
  pageTreeNodeId: Types.Scalars['ID'];
}>;


export type GQLPageQuery = { __typename?: 'Query', pageContent: { __typename?: 'PageTreeNode', id: string, name: string, path: string, document: { __typename: 'Link' } | { __typename: 'Page', content: PageContentBlockData, seo: SeoBlockData, stage: StageBlockData } | { __typename: 'PredefinedPage' } | null } | null };
