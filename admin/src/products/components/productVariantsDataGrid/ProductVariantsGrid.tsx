import { useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    type GridColDef,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    Tooltip,
    useBufferedRowCount,
    useDataGridRemote,
    usePersistentColumnState,
    useStackSwitchApi,
} from "@comet/admin";
import { Edit as EditIcon, Info as InfoIcon } from "@comet/admin-icons";
import { Box, IconButton } from "@mui/material";
import { DataGridPro, type DataGridProProps, GridColumnHeaderTitle, type GridSlotsComponent } from "@mui/x-data-grid-pro";
import { messageDescriptorMapToValueOptions } from "@src/common/components/enums/messageDescriptorMapToValueOptions/messageDescriptorMapToValueOptions";
import { variantStatusMessageDescriptorMap } from "@src/products/components/variantStatus/VariantStatus";
import { VariantStatusChipEditableForProductVariant } from "@src/products/components/variantStatusChipEditableForProductVariant/VariantStatusChipEditableForProductVariant";
import { useMemo } from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

import { deleteProductVariantMutation, productVariantsQuery } from "./ProductVariantsGrid.gql";
import {
    type GQLDeleteProductVariantMutation,
    type GQLDeleteProductVariantMutationVariables,
    type GQLProductVariantsGridItemFragment,
    type GQLProductVariantsGridQuery,
    type GQLProductVariantsGridQueryVariables,
} from "./ProductVariantsGrid.gql.generated";
import { ProductVariantsGridToolbar } from "./toolbar/ProductVariantsGridToolbar";

type ProductVariantsGridProps = {
    productId: string;
};

export function ProductVariantsGrid({ productId }: ProductVariantsGridProps) {
    const client = useApolloClient();
    const intl = useIntl();
    const dataGridProps = {
        ...useDataGridRemote({
            queryParamsPrefix: "productVariants",
        }),
        ...usePersistentColumnState("ProductVariantsGrid"),
    };
    const stackSwitchApi = useStackSwitchApi();

    const handleRowClick: DataGridProProps["onRowClick"] = (params) => {
        stackSwitchApi.activatePage("edit", params.row.id);
    };

    const columns: GridColDef<GQLProductVariantsGridItemFragment>[] = useMemo(
        () => [
            {
                field: "image",
                headerName: intl.formatMessage({ id: "productVariant.image", defaultMessage: "Image" }),
                sortable: false,
                filterable: false,
                disableExport: true,
                width: 80,
                renderCell: ({ row }) => {
                    const damFile = row.image?.attachedBlocks?.[0]?.props?.damFile;
                    if (!damFile?.fileUrl) return null;
                    return (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", py: 0.5 }}>
                            <img
                                src={damFile.fileUrl}
                                alt=""
                                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: 4 }}
                            />
                        </Box>
                    );
                },
            },
            {
                field: "name",
                headerName: intl.formatMessage({ id: "productVariant.name", defaultMessage: "Name" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "sku",
                headerName: intl.formatMessage({ id: "productVariant.sku", defaultMessage: "SKU" }),
                width: 150,
            },
            {
                field: "price",
                renderHeader: () => (
                    <>
                        <GridColumnHeaderTitle
                            label={intl.formatMessage({ id: "productVariant.price", defaultMessage: "Price" })}
                            columnWidth={150}
                        />
                        <Tooltip title={<FormattedMessage id="productVariant.price.tooltip" defaultMessage="Price in EUR" />}>
                            <InfoIcon sx={{ marginLeft: 1 }} />
                        </Tooltip>
                    </>
                ),
                headerName: intl.formatMessage({ id: "productVariant.price", defaultMessage: "Price" }),
                type: "number",
                renderCell: ({ value }) => {
                    return typeof value === "number" ? (
                        <FormattedNumber value={value} style="currency" currency="EUR" minimumFractionDigits={2} maximumFractionDigits={2} />
                    ) : (
                        ""
                    );
                },
                width: 150,
            },
            {
                field: "stock",
                headerName: intl.formatMessage({ id: "productVariant.stock", defaultMessage: "Stock" }),
                type: "number",
                width: 120,
            },
            {
                field: "variantStatus",
                headerName: intl.formatMessage({ id: "productVariant.variantStatus", defaultMessage: "Status" }),
                type: "singleSelect",
                valueOptions: messageDescriptorMapToValueOptions(variantStatusMessageDescriptorMap, intl),
                width: 160,
                renderCell: ({ row }) => (
                    <Box onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                        <VariantStatusChipEditableForProductVariant productVariantId={row.id} />
                    </Box>
                ),
            },
            {
                field: "isAvailable",
                headerName: intl.formatMessage({ id: "productVariant.isAvailable", defaultMessage: "Available" }),
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
                                    await client.mutate<GQLDeleteProductVariantMutation, GQLDeleteProductVariantMutationVariables>({
                                        mutation: deleteProductVariantMutation,
                                        variables: { id: params.row.id },
                                    });
                                }}
                                refetchQueries={[productVariantsQuery]}
                            />
                        </>
                    );
                },
            },
        ],
        [intl, client],
    );

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);
    const { data, loading, error } = useQuery<GQLProductVariantsGridQuery, GQLProductVariantsGridQueryVariables>(productVariantsQuery, {
        variables: {
            product: productId,
            filter: gqlFilter,
            search: gqlSearch,
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
            offset: dataGridProps.paginationModel.page * dataGridProps.paginationModel.pageSize,
            limit: dataGridProps.paginationModel.pageSize,
        },
    });
    const rowCount = useBufferedRowCount(data?.productVariants.totalCount);
    if (error) throw error;
    const rows = data?.productVariants.nodes ?? [];

    return (
        <DataGridPro
            {...dataGridProps}
            rows={rows}
            rowCount={rowCount}
            columns={columns}
            loading={loading}
            slots={{
                toolbar: ProductVariantsGridToolbar as GridSlotsComponent["toolbar"],
            }}
            onRowClick={handleRowClick}
        />
    );
}
