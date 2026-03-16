import { Button, CrudMoreActionsMenu, DataGridToolbar, type ExportApi, FillSpace, GridFilterButton, messages } from "@comet/admin";
import { Add as AddIcon, Excel as ExcelIcon } from "@comet/admin-icons";
import { CircularProgress } from "@mui/material";
import { type GridToolbarProps, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { FormattedMessage } from "react-intl";

export interface ProductReviewsDataGridToolbarProps extends GridToolbarProps {
    exportApi: ExportApi;
    editDialogApi: {
        openAddDialog: () => void;
    };
}

export function ProductReviewsDataGridToolbar({ exportApi, editDialogApi }: ProductReviewsDataGridToolbarProps) {
    return (
        <DataGridToolbar>
            <GridToolbarQuickFilter />
            <GridFilterButton />
            <FillSpace />
            <CrudMoreActionsMenu
                slotProps={{
                    button: {
                        responsive: true,
                    },
                }}
                overallActions={[
                    {
                        label: <FormattedMessage {...messages.downloadAsExcel} />,
                        icon: exportApi.loading ? <CircularProgress size={20} /> : <ExcelIcon />,
                        onClick: () => exportApi.exportGrid(),
                        disabled: exportApi.loading,
                    },
                ]}
            />
            <Button responsive startIcon={<AddIcon />} onClick={() => editDialogApi.openAddDialog()}>
                <FormattedMessage id="productReview.productReviewsDataGrid.newEntry" defaultMessage="New Review" />
            </Button>
        </DataGridToolbar>
    );
}
