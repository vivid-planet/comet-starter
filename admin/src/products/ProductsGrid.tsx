import { gql, useQuery } from "@apollo/client";
import {
    GridFilterButton,
    MainContent,
    muiGridFilterToGql,
    muiGridSortToGql,
    StackLink,
    TableDeleteButton,
    Toolbar,
    ToolbarActions,
    ToolbarAutomaticTitleItem,
    ToolbarFillSpace,
    ToolbarItem,
    useDataGridRemote,
    usePersistentColumnState,
    useStackSwitchApi,
} from "@comet/admin";
import { Add, Delete, Edit } from "@comet/admin-icons";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { GQLProductGridItemFragment, GQLProductsQuery, GQLProductsQueryVariables } from "./ProductsGrid.generated";

const productFragment = gql`
    fragment ProductGridItem on Product {
        id
        name
        description
    }
`;

const productsQuery = gql`
    query Products($offset: Int, $limit: Int, $search: String, $filter: ProductFilter, $sort: [ProductSort!]) {
        products(offset: $offset, limit: $limit, search: $search, filter: $filter, sort: $sort) {
            nodes {
                ...ProductGridItem
            }
            totalCount
        }
    }
    ${productFragment}
`;

const deleteProductMutation = gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
    }
`;

function ProductsToolbar(): React.ReactElement {
    return (
        <Toolbar>
            <ToolbarAutomaticTitleItem />
            <ToolbarItem>
                <GridToolbarQuickFilter />
            </ToolbarItem>
            <ToolbarFillSpace />
            <ToolbarActions>
                <GridFilterButton />
                <Button variant="contained" color="primary" component={StackLink} pageName="add" payload="add" startIcon={<Add />}>
                    <FormattedMessage id="products.addProduct" defaultMessage="Add product" />
                </Button>
            </ToolbarActions>
        </Toolbar>
    );
}

export function ProductsGrid(): React.ReactElement {
    const dataGridProps = { ...useDataGridRemote(), ...usePersistentColumnState("ProductsGrid") };
    const intl = useIntl();

    const stackApi = useStackSwitchApi();

    const columns: GridColDef<GQLProductGridItemFragment>[] = [
        {
            field: "name",
            flex: 1,
            headerName: intl.formatMessage({ id: "product.name", defaultMessage: "Name" }),
        },
        {
            field: "description",
            flex: 2,
            sortable: false,
            headerName: intl.formatMessage({ id: "product.description", defaultMessage: "Description" }),
        },
        {
            field: "actions",
            flex: 0.5,
            headerName: "",
            sortable: false,
            filterable: false,
            align: "right",
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => stackApi.activatePage("edit", `${row.id}`)} size="large">
                        <Edit color="primary" />
                    </IconButton>
                    <TableDeleteButton icon={<Delete />} mutation={deleteProductMutation} selectedId={row.id} text="" />
                </>
            ),
        },
    ];

    const { data, loading, error } = useQuery<GQLProductsQuery, GQLProductsQueryVariables>(productsQuery, {
        variables: {
            ...muiGridFilterToGql(columns, dataGridProps.filterModel),
            offset: dataGridProps.page * dataGridProps.pageSize,
            limit: dataGridProps.pageSize,
            sort: muiGridSortToGql(dataGridProps.sortModel),
        },
    });

    if (error) throw new Error(error.message);

    const rows = data?.products.nodes ?? [];
    const rowCount = data?.products.totalCount;

    return (
        <MainContent>
            <Box sx={{ height: "calc(100vh - 100px)", display: "flex" }}>
                <DataGrid
                    {...dataGridProps}
                    rows={rows}
                    columns={columns}
                    rowCount={rowCount}
                    disableSelectionOnClick
                    loading={loading}
                    components={{
                        Toolbar: ProductsToolbar,
                    }}
                />
            </Box>
        </MainContent>
    );
}
