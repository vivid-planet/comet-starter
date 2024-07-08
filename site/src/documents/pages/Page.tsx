import { SeoBlock } from "@src/documents/pages/blocks/SeoBlock";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import { Layout, PropsWithLayout } from "@src/layout/Layout";
import { gql } from "graphql-request";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { GQLPageQuery } from "./Page.generated";

export const pageQuery = gql`
    query Page($pageId: ID!) {
        pageContent: pageTreeNode(id: $pageId) {
            name
            path
            document {
                __typename
                ... on Page {
                    content
                    seo
                    stage
                }
            }
        }
    }
`;

export const Page = (props: PropsWithLayout<GQLPageQuery>) => {
    const document = props.pageContent?.document;
    return (
        <Layout {...props.layout}>
            {document?.__typename === "Page" && (
                <SeoBlock
                    data={document.seo}
                    title={props.pageContent?.name ?? ""}
                    canonicalUrl={`${process.env.NEXT_PUBLIC_SITE_URL}${props.pageContent?.path}`}
                />
            )}
            {document && document.__typename === "Page" ? (
                <main>
                    {document.stage && <StageBlock data={document.stage} />}
                    <PageContentBlock data={document.content} />
                </main>
            ) : null}
        </Layout>
    );
};
