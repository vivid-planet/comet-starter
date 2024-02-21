import { Stack, StackPage, StackSwitch } from "@comet/admin";
import * as React from "react";
import { useIntl } from "react-intl";

import { ProductForm } from "./ProductForm";
import { ProductsGrid } from "./ProductsGrid";

export function ProductsPage(): React.ReactElement {
    const intl = useIntl();

    return (
        <Stack topLevelTitle={intl.formatMessage({ id: "products.title", defaultMessage: "Products" })}>
            <StackSwitch>
                <StackPage name="table">
                    <ProductsGrid />
                </StackPage>
                <StackPage name="edit" title={intl.formatMessage({ id: "products.editProduct", defaultMessage: "Edit product" })}>
                    {(selectedId) => <ProductForm id={selectedId} />}
                </StackPage>
                <StackPage name="add" title={intl.formatMessage({ id: "products.addProduct", defaultMessage: "Add product" })}>
                    <ProductForm />
                </StackPage>
            </StackSwitch>
        </Stack>
    );
}
