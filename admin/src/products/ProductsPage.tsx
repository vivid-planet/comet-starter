import {
    Button,
    FillSpace,
    FullHeightContent,
    RouterTab,
    RouterTabs,
    SaveBoundary,
    Stack,
    StackLink,
    StackMainContent,
    StackPage,
    StackSwitch,
    StackToolbar,
    ToolbarActions,
    ToolbarAutomaticTitleItem,
    ToolbarBackButton,
} from "@comet/admin";
import { Add } from "@comet/admin-icons";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { type FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

import { ProductForm } from "./components/productForm/ProductForm";
import { ProductsGrid } from "./components/productsDataGrid/ProductsGrid";
import { ProductToolbar } from "./components/productToolbar/ProductToolbar";
import { ProductVariantForm } from "./components/productVariantForm/ProductVariantForm";
import { ProductVariantsGrid } from "./components/productVariantsDataGrid/ProductVariantsGrid";
import { ProductVariantToolbar } from "./components/productVariantToolbar/ProductVariantToolbar";

export const ProductsPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="products.title" defaultMessage="Products" />}>
            <StackSwitch>
                <StackPage name="grid">
                    <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                        <ToolbarBackButton />
                        <ToolbarAutomaticTitleItem />
                        <FillSpace />
                        <ToolbarActions>
                            <Button variant="primary" component={StackLink} pageName="add" payload="add" startIcon={<Add />}>
                                <FormattedMessage id="products.addProduct" defaultMessage="Add Product" />
                            </Button>
                        </ToolbarActions>
                    </StackToolbar>
                    <StackMainContent fullHeight>
                        <ProductsGrid />
                    </StackMainContent>
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
                                <RouterTabs>
                                    <RouterTab
                                        forceRender={true}
                                        path=""
                                        label={<FormattedMessage id="products.tab.product" defaultMessage="Product" />}
                                    >
                                        <ProductForm id={id} />
                                    </RouterTab>
                                    <RouterTab path="/variants" label={<FormattedMessage id="products.tab.variants" defaultMessage="Variants" />}>
                                        <StackSwitch>
                                            <StackPage name="grid">
                                                <FullHeightContent>
                                                    <ProductVariantsGrid productId={id} />
                                                </FullHeightContent>
                                            </StackPage>
                                            <StackPage name="add">
                                                <SaveBoundary>
                                                    <ProductVariantToolbar />
                                                    <StackMainContent>
                                                        <ProductVariantForm productId={id} />
                                                    </StackMainContent>
                                                </SaveBoundary>
                                            </StackPage>
                                            <StackPage name="edit">
                                                {(variantId) => (
                                                    <SaveBoundary>
                                                        <ProductVariantToolbar id={variantId} />
                                                        <StackMainContent>
                                                            <ProductVariantForm id={variantId} />
                                                        </StackMainContent>
                                                    </SaveBoundary>
                                                )}
                                            </StackPage>
                                        </StackSwitch>
                                    </RouterTab>
                                </RouterTabs>
                            </StackMainContent>
                        </SaveBoundary>
                    )}
                </StackPage>
            </StackSwitch>
        </Stack>
    );
};
