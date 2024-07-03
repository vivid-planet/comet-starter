import { gql, useQuery } from "@apollo/client";
import { PageContentBlock } from "@src/components/PageContentBlock";
import * as React from "react";

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
                }
            }
        }
    }
`;

const Page: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(pageQuery, {
        variables: {
            pageId: "f6a60e0e-5d42-40c5-849d-8f9cffbeaf2f",
        },
    });

    const document = data?.pageContent?.document;

    return <>{document && document.__typename === "Page" ? <PageContentBlock data={document.content} /> : null}</>;
};

export { Page };
