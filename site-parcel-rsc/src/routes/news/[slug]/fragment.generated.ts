import * as Types from '../../../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Fragment: {
    NewsDetailPage: 'NewsDetailPage'
  }
}
export type GQLNewsDetailPageFragment = { __typename?: 'News', title: string, image: DamImageBlockData, createdAt: string, content: NewsContentBlockData };
