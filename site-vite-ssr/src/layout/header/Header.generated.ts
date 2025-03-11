import * as Types from '../../graphql.generated';

import { LinkBlockData, PageContentBlockData, SeoBlockData } from "@app/blocks.generated";
export const namedOperations = {
  Fragment: {
    Header: 'Header'
  }
}
export type GQLHeaderFragment = { __typename?: 'PageTreeNode', id: string, name: string, path: string, documentType: string, childNodes: Array<{ __typename?: 'PageTreeNode', id: string, name: string, path: string, documentType: string, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null }>, document: { __typename: 'Link', content: LinkBlockData } | { __typename: 'Page' } | null };
