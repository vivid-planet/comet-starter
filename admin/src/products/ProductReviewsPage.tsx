import { Stack, StackMainContent, StackToolbar, ToolbarAutomaticTitleItem, ToolbarBackButton } from "@comet/admin";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { type FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

import { ProductReviewsDataGrid } from "./components/productReviewsDataGrid/ProductReviewsDataGrid";

export const ProductReviewsPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="productReviews.title" defaultMessage="Product Reviews" />}>
            <StackToolbar scopeIndicator={<ContentScopeIndicator global />}>
                <ToolbarBackButton />
                <ToolbarAutomaticTitleItem />
            </StackToolbar>
            <StackMainContent fullHeight>
                <ProductReviewsDataGrid />
            </StackMainContent>
        </Stack>
    );
};
