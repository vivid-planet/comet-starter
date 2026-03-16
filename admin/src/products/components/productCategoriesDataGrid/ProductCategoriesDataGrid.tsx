import { useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    type GridColDef,
    StackLink,
    useBufferedRowCount,
    useDataGridRemote,
    usePersistentColumnState,
    useStackSwitchApi,
} from "@comet/admin";
import { Edit as EditIcon } from "@comet/admin-icons";
import { useContentScope } from "@comet/cms-admin";
import { IconButton } from "@mui/material";
import { DataGridPro, type GridRowOrderChangeParams, type GridSlotsComponent } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { useIntl } from "react-intl";

import { deleteProductCategoryMutation, productCategoriesQuery, updateProductCategoryPositionMutation } from "./ProductCategoriesDataGrid.gql";
import {
    type GQLDeleteProductCategoryMutation,
    type GQLDeleteProductCategoryMutationVariables,
    type GQLProductCategoriesGridItemFragment,
    type GQLProductCategoriesGridQuery,
    type GQLProductCategoriesGridQueryVariables,
    type GQLUpdateProductCategoryPositionMutation,
    type GQLUpdateProductCategoryPositionMutationVariables,
} from "./ProductCategoriesDataGrid.gql.generated";
import { ProductCategoriesDataGridToolbar } from "./toolbar/ProductCategoriesDataGridToolbar";

export function ProductCategoriesDataGrid() {
    const client = useApolloClient();
    const intl = useIntl();
    const { scope } = useContentScope();
    const dataGridProps = {
        ...useDataGridRemote({
            queryParamsPrefix: "productCategories",
        }),
        ...usePersistentColumnState("ProductCategoriesDataGrid"),
    };
    const stackSwitchApi = useStackSwitchApi();

    const handleRowClick = (params: { row: { id: string } }) => {
        stackSwitchApi.activatePage("edit", params.row.id);
    };

    const handleRowOrderChange = async ({ row: { id }, targetIndex }: GridRowOrderChangeParams) => {
        await client.mutate<GQLUpdateProductCategoryPositionMutation, GQLUpdateProductCategoryPositionMutationVariables>({
            mutation: updateProductCategoryPositionMutation,
            variables: { id, input: { position: targetIndex + 1 } },
            awaitRefetchQueries: true,
            refetchQueries: [productCategoriesQuery],
        });
    };

    const columns: GridColDef<GQLProductCategoriesGridItemFragment>[] = useMemo(
        () => [
            {
                field: "name",
                headerName: intl.formatMessage({ id: "productCategory.name", defaultMessage: "Name" }),
                filterable: false,
                sortable: false,
                flex: 1,
                minWidth: 150,
            },
            {
                field: "slug",
                headerName: intl.formatMessage({ id: "productCategory.slug", defaultMessage: "Slug" }),
                filterable: false,
                sortable: false,
                width: 200,
            },
            {
                field: "parentCategory",
                headerName: intl.formatMessage({ id: "productCategory.parentCategory", defaultMessage: "Parent Category" }),
                filterable: false,
                sortable: false,
                flex: 1,
                minWidth: 150,
                valueGetter: (_value: unknown, row: GQLProductCategoriesGridItemFragment) => row.parentCategory?.name,
            },
            {
                field: "actions",
                headerName: "",
                sortable: false,
                filterable: false,
                type: "actions",
                align: "right",
                pinned: "right",
                width: 84,
                renderCell: (params) => {
                    return (
                        <>
                            <IconButton color="primary" component={StackLink} pageName="edit" payload={params.row.id}>
                                <EditIcon />
                            </IconButton>
                            <CrudContextMenu
                                onDelete={async () => {
                                    await client.mutate<GQLDeleteProductCategoryMutation, GQLDeleteProductCategoryMutationVariables>({
                                        mutation: deleteProductCategoryMutation,
                                        variables: { id: params.row.id },
                                    });
                                }}
                                refetchQueries={[productCategoriesQuery]}
                            />
                        </>
                    );
                },
            },
        ],
        [intl, client],
    );

    const { data, loading, error } = useQuery<GQLProductCategoriesGridQuery, GQLProductCategoriesGridQueryVariables>(productCategoriesQuery, {
        variables: {
            scope,
            sort: [{ field: "position", direction: "ASC" as const }],
            offset: 0,
            limit: 100,
        },
    });

    const rowCount = useBufferedRowCount(data?.productCategories.totalCount);
    if (error) throw error;

    const rows =
        data?.productCategories.nodes.map((node) => ({
            ...node,
            __reorder__: node.name,
        })) ?? [];

    return (
        <DataGridPro
            {...dataGridProps}
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            loading={loading}
            slots={{
                toolbar: ProductCategoriesDataGridToolbar as GridSlotsComponent["toolbar"],
            }}
            rowReordering
            onRowOrderChange={handleRowOrderChange}
            hideFooterPagination
            onRowClick={handleRowClick}
        />
    );
}
