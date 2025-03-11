import * as Types from '../../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Query: {
    NewsListBlock: 'NewsListBlock'
  },
  Fragment: {
    NewsListBlockNews: 'NewsListBlockNews'
  }
}
export type GQLNewsListBlockQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type GQLNewsListBlockQuery = { __typename?: 'Query', newsListByIds: Array<{ __typename?: 'News', id: string, title: string, slug: string, scope: { __typename?: 'NewsContentScope', domain: string, language: string } }> };

export type GQLNewsListBlockNewsFragment = { __typename?: 'News', id: string, title: string, slug: string, scope: { __typename?: 'NewsContentScope', domain: string, language: string } };
