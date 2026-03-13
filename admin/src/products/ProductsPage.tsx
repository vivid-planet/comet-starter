import { SaveBoundary, Stack, StackMainContent, StackPage, StackSwitch } from "@comet/admin";
import { type FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

import { ProductForm } from "./components/productForm/ProductForm";
import { ProductsGrid } from "./components/productsDataGrid/ProductsGrid";
import { ProductToolbar } from "./components/productToolbar/ProductToolbar";

export const ProductsPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="products.title" defaultMessage="Products" />}>
            <StackSwitch>
                <StackPage name="grid">
                    <ProductsGrid />
                </StackPage>
                <StackPage name="add">
                    <SaveBoundary>
                        <ProductToolbar />
                        <StackMainContent>
                            <ProductForm />
                        </StackMainContent>
                    </SaveBoundary>
                </StackPage>
                <StackPage name="edit">
                    {(id) => (
                        <SaveBoundary>
                            <ProductToolbar id={id} />
                            <StackMainContent>
                                <ProductForm id={id} />
                            </StackMainContent>
                        </SaveBoundary>
                    )}
                </StackPage>
            </StackSwitch>
        </Stack>
    );
};
