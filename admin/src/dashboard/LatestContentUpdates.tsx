import { gql, useQuery } from "@apollo/client";
import { LatestContentUpdatesDashboardWidget } from "@comet/cms-admin";
import { useContentScope } from "@src/common/ContentScopeProvider";
import { GQLLatestContentUpdatesQueryVariables } from "@src/dashboard/LatestContentUpdates.generated";
import { categoryToUrlParam } from "@src/pageTree/pageTreeCategories";

import { GQLLatestContentUpdatesQuery } from "./LatestContentUpdates.generated";

export const LatestContentUpdates = () => {
    const contentScope = useContentScope();
    const { data, loading, error } = useQuery<GQLLatestContentUpdatesQuery, GQLLatestContentUpdatesQueryVariables>(latestContentUpdatesQuery, {
        variables: {
            scope: contentScope.scope,
        },
    });

    const rows = data?.paginatedPageTreeNodes.nodes.map((node) => ({
        ...node,
        editUrl: `${contentScope.match.url}/pages/pagetree/${categoryToUrlParam(node.category)}/${node.id}/edit`,
    }));

    return <LatestContentUpdatesDashboardWidget rows={rows} loading={loading} error={error} />;
};

const latestContentUpdatesQuery = gql`
    query LatestContentUpdates($scope: PageTreeNodeScopeInput!) {
        paginatedPageTreeNodes(offset: 0, limit: 5, scope: $scope, sort: [{ field: updatedAt, direction: DESC }]) {
            nodes {
                id
                updatedAt
                name
                path
                scope {
                    domain
                    language
                }
                category
            }
            totalCount
        }
    }
`;
