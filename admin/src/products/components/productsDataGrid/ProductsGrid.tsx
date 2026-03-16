import { useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    dataGridDateTimeColumn,
    type GridColDef,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    Tooltip,
    useBufferedRowCount,
    useDataGridExcelExport,
    useDataGridRemote,
    usePersistentColumnState,
    useStackSwitchApi,
} from "@comet/admin";
import { Edit as EditIcon, Info as InfoIcon } from "@comet/admin-icons";
import { useContentScope } from "@comet/cms-admin";
import { Box, Chip, IconButton } from "@mui/material";
import { DataGridPro, type DataGridProProps, GridColumnHeaderTitle, type GridSlotsComponent } from "@mui/x-data-grid-pro";
import { messageDescriptorMapToValueOptions } from "@src/common/components/enums/messageDescriptorMapToValueOptions/messageDescriptorMapToValueOptions";
import { productStatusMessageDescriptorMap } from "@src/products/components/productStatus/ProductStatus";
import { ProductStatusChipEditableForProduct } from "@src/products/components/productStatusChipEditableForProduct/ProductStatusChipEditableForProduct";
import { productTypeMessageDescriptorMap } from "@src/products/components/productType/ProductType";
import { ProductTypeChipEditableForProduct } from "@src/products/components/productTypeChipEditableForProduct/ProductTypeChipEditableForProduct";
import { useMemo } from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

import { ProductCategoryFilterOperators } from "./filter/ProductCategoryFilter";
import { deleteProductMutation, productsQuery } from "./ProductsGrid.gql";
import {
    type GQLDeleteProductMutation,
    type GQLDeleteProductMutationVariables,
    type GQLProductsGridItemFragment,
    type GQLProductsGridQuery,
    type GQLProductsGridQueryVariables,
} from "./ProductsGrid.gql.generated";
import { ProductsGridToolbar, type ProductsGridToolbarProps } from "./toolbar/ProductsGridToolbar";

export function ProductsGrid() {
    const client = useApolloClient();
    const intl = useIntl();
    const { scope } = useContentScope();
    const dataGridProps = {
        ...useDataGridRemote({
            queryParamsPrefix: "products",
        }),
        ...usePersistentColumnState("ProductsGrid"),
    };
    const stackSwitchApi = useStackSwitchApi();

    const handleRowClick: DataGridProProps["onRowClick"] = (params) => {
        stackSwitchApi.activatePage("edit", params.row.id);
    };

    const columns: GridColDef<GQLProductsGridItemFragment>[] = useMemo(
        () => [
            {
                field: "mainImage",
                headerName: intl.formatMessage({ id: "product.mainImage", defaultMessage: "Image" }),
                sortable: false,
                filterable: false,
                disableExport: true,
                width: 80,
                renderCell: ({ row }) => {
                    const damFile = row.mainImage?.attachedBlocks?.[0]?.props?.damFile;
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
                headerName: intl.formatMessage({ id: "product.name", defaultMessage: "Name" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "sku",
                headerName: intl.formatMessage({ id: "product.sku", defaultMessage: "SKU" }),
                width: 150,
            },
            {
                field: "category",
                headerName: intl.formatMessage({ id: "product.category", defaultMessage: "Category" }),
                width: 150,
                sortable: false,
                valueGetter: (_value: unknown, row: GQLProductsGridItemFragment) => row.category?.name,
                filterOperators: ProductCategoryFilterOperators,
            },
            {
                field: "productType",
                headerName: intl.formatMessage({ id: "product.productType", defaultMessage: "Type" }),
                type: "singleSelect",
                valueOptions: messageDescriptorMapToValueOptions(productTypeMessageDescriptorMap, intl),
                width: 160,
                renderCell: ({ row }) => (
                    <Box onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                        <ProductTypeChipEditableForProduct productId={row.id} />
                    </Box>
                ),
            },
            {
                field: "price",
                renderHeader: () => (
                    <>
                        <GridColumnHeaderTitle label={intl.formatMessage({ id: "product.price", defaultMessage: "Price" })} columnWidth={150} />
                        <Tooltip title={<FormattedMessage id="product.price.tooltip" defaultMessage="Price in EUR" />}>
                            <InfoIcon sx={{ marginLeft: 1 }} />
                        </Tooltip>
                    </>
                ),
                headerName: intl.formatMessage({ id: "product.price", defaultMessage: "Price" }),
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
                field: "productStatus",
                headerName: intl.formatMessage({ id: "product.productStatus", defaultMessage: "Status" }),
                type: "singleSelect",
                valueOptions: messageDescriptorMapToValueOptions(productStatusMessageDescriptorMap, intl),
                width: 160,
                renderCell: ({ row }) => (
                    <Box onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                        <ProductStatusChipEditableForProduct productId={row.id} />
                    </Box>
                ),
            },
            {
                ...dataGridDateTimeColumn,
                field: "publishedAt",
                headerName: intl.formatMessage({ id: "product.publishedAt", defaultMessage: "Published At" }),
                width: 170,
            },
            {
                field: "variantCount",
                headerName: intl.formatMessage({ id: "product.variantCount", defaultMessage: "Variants" }),
                type: "number",
                sortable: false,
                filterable: false,
                width: 100,
                renderCell: ({ value }) => <Chip label={value} size="small" color="default" />,
            },
            {
                field: "isPublished",
                headerName: intl.formatMessage({ id: "product.isPublished", defaultMessage: "Published" }),
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
                                    await client.mutate<GQLDeleteProductMutation, GQLDeleteProductMutationVariables>({
                                        mutation: deleteProductMutation,
                                        variables: { id: params.row.id },
                                    });
                                }}
                                refetchQueries={[productsQuery]}
                            />
                        </>
                    );
                },
            },
        ],
        [intl, client],
    );

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);
    const { data, loading, error } = useQuery<GQLProductsGridQuery, GQLProductsGridQueryVariables>(productsQuery, {
        variables: {
            scope,
            filter: gqlFilter,
            search: gqlSearch,
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
            offset: dataGridProps.paginationModel.page * dataGridProps.paginationModel.pageSize,
            limit: dataGridProps.paginationModel.pageSize,
        },
    });
    const rowCount = useBufferedRowCount(data?.products.totalCount);
    if (error) throw error;
    const rows = data?.products.nodes ?? [];

    const exportApi = useDataGridExcelExport<
        GQLProductsGridQuery["products"]["nodes"][0],
        GQLProductsGridQuery,
        Omit<GQLProductsGridQueryVariables, "offset" | "limit">
    >({
        columns,
        variables: {
            scope,
            ...muiGridFilterToGql(columns, dataGridProps.filterModel),
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
        },
        query: productsQuery,
        resolveQueryNodes: (data) => data.products.nodes,
        totalCount: data?.products.totalCount ?? 0,
        exportOptions: {
            fileName: "Products",
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
                toolbar: ProductsGridToolbar as GridSlotsComponent["toolbar"],
            }}
            slotProps={{
                toolbar: { exportApi } as ProductsGridToolbarProps,
            }}
            onRowClick={handleRowClick}
        />
    );
}
