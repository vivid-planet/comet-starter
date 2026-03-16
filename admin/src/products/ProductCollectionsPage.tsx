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

import { ProductCollectionForm } from "./components/productCollectionForm/ProductCollectionForm";
import { ProductCollectionProductsGrid } from "./components/productCollectionProductsGrid/ProductCollectionProductsGrid";
import { ProductCollectionsGrid } from "./components/productCollectionsDataGrid/ProductCollectionsGrid";
import { ProductCollectionToolbar } from "./components/productCollectionToolbar/ProductCollectionToolbar";

export const ProductCollectionsPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="productCollections.title" defaultMessage="Product Collections" />}>
            <StackSwitch>
                <StackPage name="grid">
                    <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                        <ToolbarBackButton />
                        <ToolbarAutomaticTitleItem />
                        <FillSpace />
                        <ToolbarActions>
                            <Button variant="primary" component={StackLink} pageName="add" payload="add" startIcon={<Add />}>
                                <FormattedMessage id="productCollections.addProductCollection" defaultMessage="Add Collection" />
                            </Button>
                        </ToolbarActions>
                    </StackToolbar>
                    <StackMainContent fullHeight>
                        <ProductCollectionsGrid />
                    </StackMainContent>
                </StackPage>
                <StackPage name="add">
                    <SaveBoundary>
                        <ProductCollectionToolbar />
                        <StackMainContent>
                            <ProductCollectionForm />
                        </StackMainContent>
                    </SaveBoundary>
                </StackPage>
                <StackPage name="edit">
                    {(id) => (
                        <SaveBoundary>
                            <ProductCollectionToolbar id={id} />
                            <StackMainContent>
                                <RouterTabs>
                                    <RouterTab
                                        forceRender={true}
                                        path=""
                                        label={<FormattedMessage id="productCollections.tab.general" defaultMessage="General" />}
                                    >
                                        <ProductCollectionForm id={id} />
                                    </RouterTab>
                                    <RouterTab
                                        path="/products"
                                        label={<FormattedMessage id="productCollections.tab.products" defaultMessage="Products" />}
                                    >
                                        <FullHeightContent>
                                            <ProductCollectionProductsGrid productCollectionId={id} />
                                        </FullHeightContent>
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
