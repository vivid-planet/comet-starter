import * as Types from '../../graphql.generated.js';

import type { FooterContentBlockData, LinkBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Fragment: {
    Header: 'Header'
  }
}
export type GQLHeaderFragment = { __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, childNodes: Array<{ __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null }>, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null };
