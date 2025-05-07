import * as Types from '../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Fragment: {
    NewsList: 'NewsList'
  }
}
export type GQLNewsListFragment = { __typename?: 'PaginatedNews', nodes: Array<{ __typename?: 'News', id: string, title: string, slug: string, image: DamImageBlockData, createdAt: string, scope: { __typename?: 'NewsContentScope', language: string } }> };
