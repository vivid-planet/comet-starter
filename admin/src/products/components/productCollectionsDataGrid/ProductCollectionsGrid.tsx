import { useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    dataGridDateTimeColumn,
    type GridColDef,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    useBufferedRowCount,
    useDataGridExcelExport,
    useDataGridRemote,
    usePersistentColumnState,
    useStackSwitchApi,
} from "@comet/admin";
import { Edit as EditIcon } from "@comet/admin-icons";
import { useContentScope } from "@comet/cms-admin";
import { Chip, IconButton } from "@mui/material";
import { DataGridPro, type DataGridProProps, type GridSlotsComponent } from "@mui/x-data-grid-pro";
import { CollectionTypeChip } from "@src/products/components/collectionTypeChip/CollectionTypeChip";
import { useMemo } from "react";
import { useIntl } from "react-intl";

import { deleteProductCollectionMutation, productCollectionsQuery } from "./ProductCollectionsGrid.gql";
import {
    type GQLDeleteProductCollectionMutation,
    type GQLDeleteProductCollectionMutationVariables,
    type GQLProductCollectionsGridItemFragment,
    type GQLProductCollectionsGridListQuery,
    type GQLProductCollectionsGridListQueryVariables,
} from "./ProductCollectionsGrid.gql.generated";
import { ProductCollectionsGridToolbar, type ProductCollectionsGridToolbarProps } from "./toolbar/ProductCollectionsGridToolbar";

export function ProductCollectionsGrid() {
    const client = useApolloClient();
    const intl = useIntl();
    const { scope } = useContentScope();
    const dataGridProps = {
        ...useDataGridRemote({
            queryParamsPrefix: "productCollections",
        }),
        ...usePersistentColumnState("ProductCollectionsGrid"),
    };
    const stackSwitchApi = useStackSwitchApi();

    const handleRowClick: DataGridProProps["onRowClick"] = (params) => {
        stackSwitchApi.activatePage("edit", params.row.id);
    };

    const columns: GridColDef<GQLProductCollectionsGridItemFragment>[] = useMemo(
        () => [
            {
                field: "name",
                headerName: intl.formatMessage({ id: "productCollection.name", defaultMessage: "Name" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "collectionType",
                headerName: intl.formatMessage({ id: "productCollection.collectionType", defaultMessage: "Type" }),
                type: "singleSelect",
                valueOptions: [
                    { value: "Manual", label: intl.formatMessage({ id: "products.collectionType.manual", defaultMessage: "Manual" }) },
                    { value: "Seasonal", label: intl.formatMessage({ id: "products.collectionType.seasonal", defaultMessage: "Seasonal" }) },
                    { value: "Featured", label: intl.formatMessage({ id: "products.collectionType.featured", defaultMessage: "Featured" }) },
                    { value: "Sale", label: intl.formatMessage({ id: "products.collectionType.sale", defaultMessage: "Sale" }) },
                ],
                width: 160,
                renderCell: ({ row }) => <CollectionTypeChip value={row.collectionType} />,
            },
            {
                field: "productCount",
                headerName: intl.formatMessage({ id: "productCollection.productCount", defaultMessage: "Products" }),
                type: "number",
                sortable: false,
                filterable: false,
                width: 120,
                renderCell: ({ value }) => <Chip label={value} size="small" color="default" />,
            },
            {
                ...dataGridDateTimeColumn,
                field: "validFrom",
                headerName: intl.formatMessage({ id: "productCollection.validFrom", defaultMessage: "Valid From" }),
                width: 170,
            },
            {
                ...dataGridDateTimeColumn,
                field: "validTo",
                headerName: intl.formatMessage({ id: "productCollection.validTo", defaultMessage: "Valid To" }),
                width: 170,
            },
            {
                field: "isActive",
                headerName: intl.formatMessage({ id: "productCollection.isActive", defaultMessage: "Active" }),
                type: "boolean",
                width: 100,
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
                disableExport: true,
                renderCell: (params) => {
                    return (
                        <>
                            <IconButton color="primary" component={StackLink} pageName="edit" payload={params.row.id}>
                                <EditIcon />
                            </IconButton>
                            <CrudContextMenu
                                onDelete={async () => {
                                    await client.mutate<GQLDeleteProductCollectionMutation, GQLDeleteProductCollectionMutationVariables>({
                                        mutation: deleteProductCollectionMutation,
                                        variables: { id: params.row.id },
                                    });
                                }}
                                refetchQueries={[productCollectionsQuery]}
                            />
                        </>
                    );
                },
            },
        ],
        [intl, client],
    );

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);
    const { data, loading, error } = useQuery<GQLProductCollectionsGridListQuery, GQLProductCollectionsGridListQueryVariables>(
        productCollectionsQuery,
        {
            variables: {
                scope,
                filter: gqlFilter,
                search: gqlSearch,
                sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
                offset: dataGridProps.paginationModel.page * dataGridProps.paginationModel.pageSize,
                limit: dataGridProps.paginationModel.pageSize,
            },
        },
    );
    const rowCount = useBufferedRowCount(data?.productCollections.totalCount);
    if (error) throw error;
    const rows = data?.productCollections.nodes ?? [];

    const exportApi = useDataGridExcelExport<
        GQLProductCollectionsGridListQuery["productCollections"]["nodes"][0],
        GQLProductCollectionsGridListQuery,
        Omit<GQLProductCollectionsGridListQueryVariables, "offset" | "limit">
    >({
        columns,
        variables: {
            scope,
            ...muiGridFilterToGql(columns, dataGridProps.filterModel),
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
        },
        query: productCollectionsQuery,
        resolveQueryNodes: (data) => data.productCollections.nodes,
        totalCount: data?.productCollections.totalCount ?? 0,
        exportOptions: {
            fileName: "ProductCollections",
        },
    });

    return (
        <DataGridPro
            {...dataGridProps}
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            loading={loading}
            slots={{
                toolbar: ProductCollectionsGridToolbar as GridSlotsComponent["toolbar"],
            }}
            slotProps={{
                toolbar: { exportApi } as ProductCollectionsGridToolbarProps,
            }}
            onRowClick={handleRowClick}
        />
    );
}
