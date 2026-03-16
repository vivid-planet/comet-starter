import { useQuery } from "@apollo/client";
import {
    FillSpace,
    Loading,
    LocalErrorScopeApolloContext,
    SaveBoundarySaveButton,
    StackPageTitle,
    StackToolbar,
    ToolbarActions,
    ToolbarAutomaticTitleItem,
    ToolbarBackButton,
    ToolbarItem,
    Tooltip,
} from "@comet/admin";
import { Error } from "@comet/admin-icons";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { Box, Typography, useTheme } from "@mui/material";
import { type FunctionComponent, type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { productCategoryToolbarQuery } from "./ProductCategoryToolbar.gql";
import { type GQLProductCategoryToolbarQuery, type GQLProductCategoryToolbarQueryVariables } from "./ProductCategoryToolbar.gql.generated";

interface ProductCategoryToolbarProps {
    id?: string;
    additionalActions?: ReactNode;
}

export const ProductCategoryToolbar: FunctionComponent<ProductCategoryToolbarProps> = ({ id, additionalActions }) => {
    const theme = useTheme();

    const { data, loading, error } = useQuery<GQLProductCategoryToolbarQuery, GQLProductCategoryToolbarQueryVariables>(
        productCategoryToolbarQuery,
        id != null
            ? {
                  variables: { id },
                  context: LocalErrorScopeApolloContext,
              }
            : { skip: true },
    );

    if (loading) {
        return (
            <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                </Box>
            </StackToolbar>
        );
    }

    const title = data?.productCategory.name;

    return (
        <StackPageTitle title={title}>
            <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                <ToolbarBackButton />

                {title ? (
                    <ToolbarItem>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h5">{title}</Typography>
                        </Box>
                    </ToolbarItem>
                ) : (
                    <ToolbarAutomaticTitleItem />
                )}

                {error != null && (
                    <ToolbarItem>
                        <Tooltip
                            title={
                                <>
                                    <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
                                        <FormattedMessage id="productCategory.toolbar.error.title" defaultMessage="Data could not be loaded." />
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        <FormattedMessage
                                            id="productCategory.toolbar.error.description"
                                            defaultMessage="There was a problem loading the requested data."
                                        />
                                    </Typography>
                                </>
                            }
                        >
                            <Box sx={{ display: "flex" }}>
                                <Error htmlColor={theme.palette.error.main} />
                            </Box>
                        </Tooltip>
                    </ToolbarItem>
                )}

                <FillSpace />

                <ToolbarActions>
                    {additionalActions}
                    <SaveBoundarySaveButton />
                </ToolbarActions>
            </StackToolbar>
        </StackPageTitle>
    );
};
