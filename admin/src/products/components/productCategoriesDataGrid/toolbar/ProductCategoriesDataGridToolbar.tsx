import { Button, DataGridToolbar, FillSpace, StackLink } from "@comet/admin";
import { Add as AddIcon } from "@comet/admin-icons";
import { FormattedMessage } from "react-intl";

export function ProductCategoriesDataGridToolbar() {
    return (
        <DataGridToolbar>
            <FillSpace />
            <Button responsive startIcon={<AddIcon />} component={StackLink} pageName="add" payload="add">
                <FormattedMessage id="productCategory.productCategoriesGrid.newEntry" defaultMessage="New Category" />
            </Button>
        </DataGridToolbar>
    );
}
