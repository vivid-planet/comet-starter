import { gql } from "@apollo/client";
import { Table, TableQuery, useTableQuery } from "@comet/admin";
import { BuildRuntime } from "@comet/cms-admin";
import { styled } from "@mui/material/styles";
import { GQLJobStatus } from "@src/graphql.generated";
import { parseISO } from "date-fns";
import * as React from "react";
import { useIntl } from "react-intl";

import { GQLLatestBuildsQuery, GQLLatestBuildsQueryVariables } from "./LatestBuilds.generated";

const LATEST_BUILDS = gql`
    query LatestBuilds {
        builds(limit: 5) {
            id
            status
            name
            trigger
            startTime
            completionTime
        }
    }
`;

export const LatestBuilds: React.FC = () => {
    const intl = useIntl();

    const { tableData, api, loading, error } = useTableQuery<GQLLatestBuildsQuery, GQLLatestBuildsQueryVariables>()(LATEST_BUILDS, {
        resolveTableData: (data) => ({
            data: data.builds,
            totalCount: 5,
        }),
    });

    return (
        <TableQuery api={api} loading={loading} error={error}>
            {tableData && (
                <>
                    <Table
                        {...tableData}
                        columns={[
                            {
                                name: "runtime",
                                header: intl.formatMessage({ id: "dashboard.latestBuilds.runtime", defaultMessage: "Runtime" }),
                                render: (row) => (
                                    <BuildRuntime
                                        startTime={row.startTime ? parseISO(row.startTime) : undefined}
                                        completionTime={row.completionTime ? parseISO(row.completionTime) : undefined}
                                    />
                                ),
                            },
                            {
                                name: "status",
                                header: intl.formatMessage({ id: "dashboard.latestBuilds.status", defaultMessage: "Status" }),
                                render: (row) => {
                                    return <BuildStatus status={row.status}>{row.status}</BuildStatus>;
                                },
                            },
                        ]}
                    />
                </>
            )}
        </TableQuery>
    );
};

const BuildStatus = styled("div")<{ status: GQLJobStatus }>`
    color: ${({ theme, status }) => {
        if (status === "succeeded") {
            return theme.palette.success.main;
        } else if (status === "failed") {
            return theme.palette.error.main;
        }

        return theme.palette.primary.main;
    }};
`;
