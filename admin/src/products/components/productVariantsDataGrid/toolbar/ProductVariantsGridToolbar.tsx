import { Button, DataGridToolbar, FillSpace, GridFilterButton, StackLink } from "@comet/admin";
import { Add as AddIcon } from "@comet/admin-icons";
import { GridToolbarQuickFilter } from "@mui/x-data-grid-pro";
import { FormattedMessage } from "react-intl";

export function ProductVariantsGridToolbar() {
    return (
        <DataGridToolbar>
            <GridToolbarQuickFilter />
            <GridFilterButton />
            <FillSpace />
            <Button responsive startIcon={<AddIcon />} component={StackLink} pageName="add" payload="add">
                <FormattedMessage id="productVariant.productVariantsGrid.newEntry" defaultMessage="New Variant" />
            </Button>
        </DataGridToolbar>
    );
}
