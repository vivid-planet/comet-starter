import { useApolloClient, useQuery } from "@apollo/client";
import {
    CrudContextMenu,
    dataGridDateTimeColumn,
    type GridColDef,
    muiGridFilterToGql,
    muiGridSortToGql,
    useBufferedRowCount,
    useDataGridExcelExport,
    useDataGridRemote,
    useEditDialog,
    usePersistentColumnState,
} from "@comet/admin";
import { Edit as EditIcon } from "@comet/admin-icons";
import { IconButton } from "@mui/material";
import { DataGridPro, type GridSlotsComponent } from "@mui/x-data-grid-pro";
import { Rating } from "@src/products/components/rating/Rating";
import { useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ProductReviewForm } from "../productReviewForm/ProductReviewForm";
import { ProductFilterOperators } from "./filter/ProductFilter";
import { deleteProductReviewMutation, productReviewsQuery } from "./ProductReviewsDataGrid.gql";
import {
    type GQLDeleteProductReviewMutation,
    type GQLDeleteProductReviewMutationVariables,
    type GQLProductReviewsDataGridItemFragment,
    type GQLProductReviewsDataGridQuery,
    type GQLProductReviewsDataGridQueryVariables,
} from "./ProductReviewsDataGrid.gql.generated";
import { ProductReviewsDataGridToolbar, type ProductReviewsDataGridToolbarProps } from "./ProductReviewsDataGridToolbar";

type ProductReviewsDataGridProps = {
    productId?: string;
};

export function ProductReviewsDataGrid({ productId }: ProductReviewsDataGridProps) {
    const client = useApolloClient();
    const intl = useIntl();
    const dataGridProps = {
        ...useDataGridRemote({
            queryParamsPrefix: "productReviews",
        }),
        ...usePersistentColumnState("ProductReviewsDataGrid"),
    };

    const [EditDialog, { id: selectedId, mode }, editDialogApi] = useEditDialog();

    const columns: GridColDef<GQLProductReviewsDataGridItemFragment>[] = useMemo(
        () => [
            {
                field: "title",
                headerName: intl.formatMessage({ id: "productReview.title", defaultMessage: "Title" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "rating",
                headerName: intl.formatMessage({ id: "productReview.rating", defaultMessage: "Rating" }),
                width: 120,
                renderCell: ({ row }) => <Rating value={row.rating} />,
                sortable: true,
                filterable: false,
            },
            {
                field: "reviewerName",
                headerName: intl.formatMessage({ id: "productReview.reviewerName", defaultMessage: "Reviewer" }),
                width: 180,
            },
            {
                field: "product",
                headerName: intl.formatMessage({ id: "productReview.product", defaultMessage: "Product" }),
                width: 200,
                sortable: false,
                valueGetter: (_value: unknown, row: GQLProductReviewsDataGridItemFragment) => row.product.name,
                filterOperators: ProductFilterOperators,
            },
            {
                ...dataGridDateTimeColumn,
                field: "reviewedAt",
                headerName: intl.formatMessage({ id: "productReview.reviewedAt", defaultMessage: "Reviewed At" }),
                width: 170,
            },
            {
                field: "isApproved",
                headerName: intl.formatMessage({ id: "productReview.isApproved", defaultMessage: "Approved" }),
                type: "boolean",
                width: 110,
            },
            {
                field: "domain",
                headerName: intl.formatMessage({ id: "productReview.domain", defaultMessage: "Domain" }),
                width: 120,
                sortable: false,
                filterable: false,
                valueGetter: (_value: unknown, row: GQLProductReviewsDataGridItemFragment) => row.product.domain,
            },
            {
                field: "language",
                headerName: intl.formatMessage({ id: "productReview.language", defaultMessage: "Language" }),
                width: 120,
                sortable: false,
                filterable: false,
                valueGetter: (_value: unknown, row: GQLProductReviewsDataGridItemFragment) => row.product.language,
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
                            <IconButton color="primary" onClick={() => editDialogApi.openEditDialog(params.row.id)}>
                                <EditIcon />
                            </IconButton>
                            <CrudContextMenu
                                onDelete={async () => {
                                    await client.mutate<GQLDeleteProductReviewMutation, GQLDeleteProductReviewMutationVariables>({
                                        mutation: deleteProductReviewMutation,
                                        variables: { id: params.row.id },
                                    });
                                }}
                                refetchQueries={[productReviewsQuery]}
                            />
                        </>
                    );
                },
            },
        ],
        [intl, client, editDialogApi],
    );

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);

    const combinedFilter = productId ? { and: [{ product: { equal: productId } }, ...(gqlFilter ? [gqlFilter] : [])] } : gqlFilter;

    const { data, loading, error } = useQuery<GQLProductReviewsDataGridQuery, GQLProductReviewsDataGridQueryVariables>(productReviewsQuery, {
        variables: {
            filter: combinedFilter,
            search: gqlSearch,
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
            offset: dataGridProps.paginationModel.page * dataGridProps.paginationModel.pageSize,
            limit: dataGridProps.paginationModel.pageSize,
        },
    });
    const rowCount = useBufferedRowCount(data?.productReviews.totalCount);
    if (error) throw error;
    const rows = data?.productReviews.nodes ?? [];

    const exportApi = useDataGridExcelExport<
        GQLProductReviewsDataGridQuery["productReviews"]["nodes"][0],
        GQLProductReviewsDataGridQuery,
        Omit<GQLProductReviewsDataGridQueryVariables, "offset" | "limit">
    >({
        columns,
        variables: {
            ...muiGridFilterToGql(columns, dataGridProps.filterModel),
            filter: combinedFilter,
            sort: muiGridSortToGql(dataGridProps.sortModel, columns) ?? [],
        },
        query: productReviewsQuery,
        resolveQueryNodes: (data) => data.productReviews.nodes,
        totalCount: data?.productReviews.totalCount ?? 0,
        exportOptions: {
            fileName: "ProductReviews",
        },
    });

    return (
        <>
            <DataGridPro
                {...dataGridProps}
                rows={rows}
                rowCount={rowCount}
                columns={columns}
                loading={loading}
                slots={{
                    toolbar: ProductReviewsDataGridToolbar as GridSlotsComponent["toolbar"],
                }}
                slotProps={{
                    toolbar: { exportApi, editDialogApi } as ProductReviewsDataGridToolbarProps,
                }}
                onRowClick={(params) => editDialogApi.openEditDialog(params.row.id)}
            />
            <EditDialog
                title={{
                    edit: <FormattedMessage id="productReview.editReview" defaultMessage="Edit Review" />,
                    add: <FormattedMessage id="productReview.addReview" defaultMessage="Add Review" />,
                }}
            >
                {selectedId !== undefined && <ProductReviewForm id={selectedId} />}
                {mode === "add" && <ProductReviewForm />}
            </EditDialog>
        </>
    );
}
