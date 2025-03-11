import * as Types from '../../graphql.generated.js';

import type { FooterContentBlockData, LinkBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Fragment: {
    PageLink: 'PageLink'
  }
}
export type GQLPageLinkFragment = { __typename?: 'PageTreeNode', path: string, documentType: string, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null };
