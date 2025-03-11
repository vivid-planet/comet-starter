import * as Types from '../../../../../../graphql.generated';

import { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Query: {
    NewsDetailPage: 'NewsDetailPage'
  }
}
export type GQLNewsDetailPageQueryVariables = Types.Exact<{
  slug: Types.Scalars['String']['input'];
  scope: Types.GQLNewsContentScopeInput;
}>;


export type GQLNewsDetailPageQuery = { __typename?: 'Query', newsBySlug: { __typename?: 'News', id: string, title: string, image: DamImageBlockData, createdAt: string, content: NewsContentBlockData } | null };
