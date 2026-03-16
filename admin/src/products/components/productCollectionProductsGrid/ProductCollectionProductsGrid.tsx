import { useApolloClient, useQuery } from "@apollo/client";
import {
    Button,
    DataGridToolbar,
    Dialog,
    FillSpace,
    type GridColDef,
    muiGridFilterToGql,
    muiGridSortToGql,
    useBufferedRowCount,
    useDataGridRemote,
    usePersistentColumnState,
} from "@comet/admin";
import { Edit as EditIcon, Remove as RemoveIcon, Select as SelectIcon } from "@comet/admin-icons";
import { useContentScope } from "@comet/cms-admin";
import { DialogActions, IconButton } from "@mui/material";
import { DataGridPro, type GridRowSelectionModel, type GridSlotsComponent, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link as RouterLink } from "react-router-dom";

import { productCollectionProductsQuery, selectProductsQuery, updateProductCollectionProductsMutation } from "./ProductCollectionProductsGrid.gql";
import {
    type GQLProductCollectionProductsQuery,
    type GQLProductCollectionProductsQueryVariables,
    type GQLSelectProductsQuery,
    type GQLSelectProductsQueryVariables,
    type GQLUpdateProductCollectionProductsMutation,
    type GQLUpdateProductCollectionProductsMutationVariables,
} from "./ProductCollectionProductsGrid.gql.generated";

function SelectedProductsToolbar({ onSelectProducts }: { onSelectProducts: () => void }) {
    return (
        <DataGridToolbar>
            <GridToolbarQuickFilter />
            <FillSpace />
            <Button responsive startIcon={<SelectIcon />} onClick={onSelectProducts}>
                <FormattedMessage id="productCollection.products.selectProducts" defaultMessage="Select Products" />
            </Button>
        </DataGridToolbar>
    );
}

function SelectProductsDialogToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

function SelectProductsDialog({
    open,
    onClose,
    onSave,
    initialSelection,
}: {
    open: boolean;
    onClose: () => void;
    onSave: (selectedIds: string[]) => void;
    initialSelection: string[];
}) {
    const intl = useIntl();
    const { scope } = useContentScope();
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(initialSelection);

    useEffect(() => {
        if (open) {
            setSelectionModel(initialSelection);
        }
    }, [open, initialSelection]);

    const dataGridProps = {
        ...useDataGridRemote({ queryParamsPrefix: "selectProducts" }),
        ...usePersistentColumnState("SelectProductsDialog"),
    };

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "name",
                headerName: intl.formatMessage({ id: "productCollection.selectProducts.name", defaultMessage: "Name" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "productType",
                headerName: intl.formatMessage({ id: "productCollection.selectProducts.productType", defaultMessage: "Type" }),
                width: 150,
            },
        ],
        [intl],
    );

    const { filter: gqlFilter, search: gqlSearch } = muiGridFilterToGql(columns, dataGridProps.filterModel);
    const { data, loading, error } = useQuery<GQLSelectProductsQuery, GQLSelectProductsQueryVariables>(selectProductsQuery, {
        skip: !open,
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

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            title={<FormattedMessage id="productCollection.selectProducts.title" defaultMessage="Select Products" />}
        >
            <DataGridPro
                sx={{ height: "70vh" }}
                {...dataGridProps}
                rows={rows}
                rowCount={rowCount}
                columns={columns}
                loading={loading}
                checkboxSelection
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={setSelectionModel}
                keepNonExistentRowsSelected
                slots={{
                    toolbar: SelectProductsDialogToolbar as GridSlotsComponent["toolbar"],
                }}
            />
            <DialogActions>
                <Button variant="textDark" onClick={onClose}>
                    <FormattedMessage id="productCollection.selectProducts.cancel" defaultMessage="Cancel" />
                </Button>
                <Button onClick={() => onSave(selectionModel.map(String))}>
                    <FormattedMessage id="productCollection.selectProducts.save" defaultMessage="Save Selection" />
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function ProductCollectionProductsGrid({ productCollectionId }: { productCollectionId: string }) {
    const client = useApolloClient();
    const intl = useIntl();
    const { match: contentScopeMatch } = useContentScope();
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, loading, error } = useQuery<GQLProductCollectionProductsQuery, GQLProductCollectionProductsQueryVariables>(
        productCollectionProductsQuery,
        {
            variables: { id: productCollectionId },
        },
    );

    const selectedProducts = useMemo(() => data?.productCollection.products ?? [], [data]);
    const selectedProductIds = useMemo(() => selectedProducts.map((product) => product.id), [selectedProducts]);

    const columns: GridColDef[] = useMemo(
        () => [
            {
                field: "name",
                headerName: intl.formatMessage({ id: "productCollection.products.name", defaultMessage: "Name" }),
                flex: 1,
                minWidth: 200,
            },
            {
                field: "productType",
                headerName: intl.formatMessage({ id: "productCollection.products.productType", defaultMessage: "Type" }),
                width: 150,
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
                renderCell: (params) => (
                    <>
                        <IconButton color="primary" component={RouterLink} to={`${contentScopeMatch.url}/products/edit/${params.row.id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={async () => {
                                const remainingIds = selectedProductIds.filter((id) => id !== params.row.id);
                                await client.mutate<GQLUpdateProductCollectionProductsMutation, GQLUpdateProductCollectionProductsMutationVariables>({
                                    mutation: updateProductCollectionProductsMutation,
                                    variables: { id: productCollectionId, input: { products: remainingIds } },
                                    refetchQueries: [productCollectionProductsQuery],
                                });
                            }}
                        >
                            <RemoveIcon />
                        </IconButton>
                    </>
                ),
            },
        ],
        [intl, client, productCollectionId, selectedProductIds, contentScopeMatch.url],
    );

    if (error) throw error;

    const handleSave = useCallback(
        async (newSelectedIds: string[]) => {
            await client.mutate<GQLUpdateProductCollectionProductsMutation, GQLUpdateProductCollectionProductsMutationVariables>({
                mutation: updateProductCollectionProductsMutation,
                variables: { id: productCollectionId, input: { products: newSelectedIds } },
                refetchQueries: [productCollectionProductsQuery],
            });
            setDialogOpen(false);
        },
        [client, productCollectionId],
    );

    return (
        <>
            <DataGridPro
                rows={selectedProducts}
                columns={columns}
                loading={loading}
                disableRowSelectionOnClick
                slots={{
                    toolbar: (() => <SelectedProductsToolbar onSelectProducts={() => setDialogOpen(true)} />) as GridSlotsComponent["toolbar"],
                }}
            />
            <SelectProductsDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSave={handleSave} initialSelection={selectedProductIds} />
        </>
    );
}
