import * as Types from '../graphql.generated.js';

import type { FooterContentBlockData, LinkBlockData, PageContentBlockData, SeoBlockData, StageBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Query: {
    Layout: 'Layout'
  }
}
export type GQLLayoutQueryVariables = Types.Exact<{
  domain: Types.Scalars['String'];
  language: Types.Scalars['String'];
}>;


export type GQLLayoutQuery = { __typename?: 'Query', header: Array<{ __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, childNodes: Array<{ __typename?: 'PageTreeNode', id: string, name: string, hideInMenu: boolean, path: string, documentType: string, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null }>, scope: { __typename?: 'PageTreeNodeScope', language: string }, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null }>, footer: { __typename?: 'Footer', content: FooterContentBlockData } | null };
