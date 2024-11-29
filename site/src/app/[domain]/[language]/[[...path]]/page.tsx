export const dynamic = "error";

import { gql, previewParams } from "@comet/cms-site";
import { documentTypes } from "@src/documents";
import { GQLPageTreeNodeScopeInput } from "@src/graphql.generated";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { notFound } from "next/navigation";

import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables } from "./page.generated";

const documentTypeQuery = gql`
    query DocumentType($path: String!, $scope: PageTreeNodeScopeInput!) {
        pageTreeNodeByPath(path: $path, scope: $scope) {
            id
            documentType
        }
    }
`;

export default async function Page({ params: { path, domain, language } }: { params: { path: string[]; domain: string; language: string } }) {
    const scope = { domain, language };

    const { previewData } = (await previewParams()) || { previewData: undefined };
    const graphqlFetch = createGraphQLFetch(previewData);

    //fetch documentType
    const data = await graphqlFetch<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(documentTypeQuery, {
        path: `/${(path ?? []).join("/")}`,
        scope: scope as GQLPageTreeNodeScopeInput, //TODO fix type, the scope from previewParams() is not compatible with GQLPageTreeNodeScopeInput
    });

    if (!data.pageTreeNodeByPath?.documentType) {
        notFound();
    }

    const pageTreeNodeId = data.pageTreeNodeByPath.id;

    const props = {
        pageTreeNodeId,
        scope,
    };

    const { component: Component } = documentTypes[data.pageTreeNodeByPath.documentType];

    return <Component {...props} />;
}

export async function generateStaticParams() {
    return [];
}
