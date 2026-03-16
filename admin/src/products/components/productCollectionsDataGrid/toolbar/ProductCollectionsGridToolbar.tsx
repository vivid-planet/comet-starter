import { CrudMoreActionsMenu, DataGridToolbar, type ExportApi, FillSpace, GridFilterButton, messages } from "@comet/admin";
import { Excel as ExcelIcon } from "@comet/admin-icons";
import { CircularProgress } from "@mui/material";
import { type GridToolbarProps, GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export interface ProductCollectionsGridToolbarProps extends GridToolbarProps {
    toolbarAction?: ReactNode;
    exportApi: ExportApi;
}

export function ProductCollectionsGridToolbar({ toolbarAction, exportApi }: ProductCollectionsGridToolbarProps) {
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
            {toolbarAction}
        </DataGridToolbar>
    );
}
