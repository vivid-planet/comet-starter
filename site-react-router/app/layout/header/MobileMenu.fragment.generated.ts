import * as Types from '../../graphql.generated.js';

import type { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Fragment: {
    MobileMenu: 'MobileMenu'
  }
}
export type GQLMobileMenuFragment = { __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, childNodes: Array<{ __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | { __typename: 'PredefinedPage' } | null }>, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | { __typename: 'PredefinedPage' } | null };
