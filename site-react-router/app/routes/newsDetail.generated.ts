import * as Types from '../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Query: {
    NewsDetailPage: 'NewsDetailPage'
  },
  Fragment: {
    NewsDetailPage: 'NewsDetailPage'
  }
}
export type GQLNewsDetailPageFragment = { __typename?: 'News', title: string, image: DamImageBlockData, createdAt: string, content: NewsContentBlockData };

export type GQLNewsDetailPageQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
  scope: Types.GQLNewsContentScopeInput;
}>;


export type GQLNewsDetailPageQuery = { __typename?: 'Query', newsBySlug: { __typename?: 'News', id: string, title: string, image: DamImageBlockData, createdAt: string, content: NewsContentBlockData } | null };
