import { StackMainContent, StackToolbar, ToolbarAutomaticTitleItem, ToolbarBackButton } from "@comet/admin";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { type FunctionComponent } from "react";

import { ProductReviewsDataGrid } from "./components/productReviewsDataGrid/ProductReviewsDataGrid";

export const ProductReviewsPage: FunctionComponent = () => {
    return (
        <>
            <StackToolbar scopeIndicator={<ContentScopeIndicator global />}>
                <ToolbarBackButton />
                <ToolbarAutomaticTitleItem />
            </StackToolbar>
            <StackMainContent fullHeight>
                <ProductReviewsDataGrid />
            </StackMainContent>
        </>
    );
};
