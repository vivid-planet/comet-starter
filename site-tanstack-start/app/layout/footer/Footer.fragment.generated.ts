import * as Types from '../../graphql.generated.js';

import type { FooterContentBlockData, LinkBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Fragment: {
    Footer: 'Footer'
  }
}
export type GQLFooterFragment = { __typename?: 'Footer', content: FooterContentBlockData };
