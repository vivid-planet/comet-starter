import { gql } from "@apollo/client";
import { ITableColumnsProps, Table, TableBodyRow, TableColumns, TableQuery, useTableQuery } from "@comet/admin";
import { ArrowRight } from "@comet/admin-icons";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { FormattedDate, FormattedTime, useIntl } from "react-intl";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
    GQLLatestContentUpdatesPageFragment,
    GQLLatestContentUpdatesQuery,
    GQLLatestContentUpdatesQueryVariables,
} from "./LatestContentUpdates.generated";

const latestContentUpdatesFragment = gql`
    fragment LatestContentUpdatesPage on Page {
        id
        updatedAt
        pageTreeNode {
            id
            name
            path
            scope {
                domain
                language
            }
            category
        }
    }
`;

const latestContentUpdatesQuery = gql`
    query LatestContentUpdates {
        pages(offset: 0, limit: 5, sortColumnName: "updatedAt", sortDirection: DESC) {
            nodes {
                ...LatestContentUpdatesPage
            }
            totalCount
        }
    }
    ${latestContentUpdatesFragment}
`;

export const LatestContentUpdates: React.FC = () => {
    const intl = useIntl();

    const { tableData, api, loading, error } = useTableQuery<GQLLatestContentUpdatesQuery, GQLLatestContentUpdatesQueryVariables>()(
        latestContentUpdatesQuery,
        {
            resolveTableData: (data) => {
                // in rare cases, pages can exist without being linked in the pagetree (e.g. pasting with conflicts), we hide them
                const pageTreeNodesLinkedInPageTree = data.pages.nodes.filter((pageTreeNode) => pageTreeNode.pageTreeNode);

                return {
                    data: pageTreeNodesLinkedInPageTree,
                    totalCount: pageTreeNodesLinkedInPageTree.length,
                };
            },
        },
    );

    const theme = useTheme();

    return (
        <TableQuery api={api} loading={loading} error={error}>
            {tableData && (
                <>
                    <Table
                        {...tableData}
                        columns={[
                            {
                                name: "pageTreeNode.name",
                                header: intl.formatMessage({ id: "comet.dashboard.latestContentUpdates.name", defaultMessage: "Page Name" }),
                            },
                            {
                                name: "updatedAt",
                                header: intl.formatMessage({ id: "comet.dashboard.latestContentUpdates.updatedAt", defaultMessage: "Updated At" }),
                                render: (row) => (
                                    <div>
                                        <FormattedDate value={row.updatedAt} day="2-digit" month="2-digit" year="numeric" />
                                        {", "}
                                        <FormattedTime value={row.updatedAt} />
                                    </div>
                                ),
                            },
                            {
                                name: "jumpTo",
                                render: (row) => {
                                    if (!row.pageTreeNode) {
                                        return null;
                                    }

                                    return (
                                        <Link
                                            to={`/${row.pageTreeNode.scope.domain}/${row.pageTreeNode.scope.language}/pages/pagetree/main-navigation/${row.pageTreeNode.id}/edit`}
                                        >
                                            <ArrowRight htmlColor={theme.palette.grey["600"]} />
                                        </Link>
                                    );
                                },
                                cellProps: { align: "right", style: { lineHeight: 0 } },
                            },
                        ]}
                        renderTableRow={({ columns, row }) => {
                            return <Row key={row.id} columns={columns} row={row} />;
                        }}
                    />
                </>
            )}
        </TableQuery>
    );
};

function Row({ columns, row }: ITableColumnsProps<GQLLatestContentUpdatesPageFragment>) {
    const history = useHistory();

    return (
        <HoverableTableBodyRow
            onClick={() => {
                if (row.pageTreeNode) {
                    history.push(
                        `/${row.pageTreeNode.scope.domain}/${row.pageTreeNode.scope.language}/pages/pagetree/main-navigation/${row.pageTreeNode.id}/edit`,
                    );
                }
            }}
        >
            <TableColumns columns={columns} row={row} />
        </HoverableTableBodyRow>
    );
}

export const HoverableTableBodyRow = styled(TableBodyRow)`
    cursor: pointer;

    :hover {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;
