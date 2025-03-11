import * as Types from '../../graphql.generated';

import { DamImageBlockData, FooterContentBlockData, LinkBlockData, NewsContentBlockData, PageContentBlockData, RichTextBlockData, SeoBlockData } from "@src/blocks.generated";
export const namedOperations = {
  Query: {
    NewsBlockDetail: 'NewsBlockDetail'
  }
}
export type GQLNewsBlockDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GQLNewsBlockDetailQuery = { __typename?: 'Query', news: { __typename?: 'News', title: string } };
