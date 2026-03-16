import {
    SaveBoundary,
    Stack,
    StackMainContent,
    StackPage,
    StackSwitch,
    StackToolbar,
    ToolbarAutomaticTitleItem,
    ToolbarBackButton,
} from "@comet/admin";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { type FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

import { ProductCategoriesDataGrid } from "./components/productCategoriesDataGrid/ProductCategoriesDataGrid";
import { ProductCategoryForm } from "./components/productCategoryForm/ProductCategoryForm";
import { ProductCategoryToolbar } from "./components/productCategoryToolbar/ProductCategoryToolbar";

export const ProductCategoriesPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="productCategories.title" defaultMessage="Product Categories" />}>
            <StackSwitch>
                <StackPage name="grid">
                    <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                        <ToolbarBackButton />
                        <ToolbarAutomaticTitleItem />
                    </StackToolbar>
                    <StackMainContent fullHeight>
                        <ProductCategoriesDataGrid />
                    </StackMainContent>
                </StackPage>
                <StackPage name="add">
                    <SaveBoundary>
                        <ProductCategoryToolbar />
                        <StackMainContent>
                            <ProductCategoryForm />
                        </StackMainContent>
                    </SaveBoundary>
                </StackPage>
                <StackPage name="edit">
                    {(id) => (
                        <SaveBoundary>
                            <ProductCategoryToolbar id={id} />
                            <StackMainContent>
                                <ProductCategoryForm id={id} />
                            </StackMainContent>
                        </SaveBoundary>
                    )}
                </StackPage>
            </StackSwitch>
        </Stack>
    );
};
