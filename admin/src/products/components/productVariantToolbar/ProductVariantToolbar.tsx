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

import { productVariantToolbarQuery } from "./ProductVariantToolbar.gql";
import { type GQLProductVariantToolbarQuery, type GQLProductVariantToolbarQueryVariables } from "./ProductVariantToolbar.gql.generated";

interface ProductVariantToolbarProps {
    id?: string;
    additionalActions?: ReactNode;
}

export const ProductVariantToolbar: FunctionComponent<ProductVariantToolbarProps> = ({ id, additionalActions }) => {
    const theme = useTheme();

    const { data, loading, error } = useQuery<GQLProductVariantToolbarQuery, GQLProductVariantToolbarQueryVariables>(
        productVariantToolbarQuery,
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

    const title = data?.productVariant.name;
    const supportText = data?.productVariant.sku;

    return (
        <StackPageTitle title={title}>
            <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                <ToolbarBackButton />

                {title ? (
                    <ToolbarItem>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h5">{title}</Typography>
                            {supportText && (
                                <Typography color={theme.palette.grey["400"]} variant="body2">
                                    {supportText}
                                </Typography>
                            )}
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
                                        <FormattedMessage id="productVariant.toolbar.error.title" defaultMessage="Data could not be loaded." />
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        <FormattedMessage
                                            id="productVariant.toolbar.error.description"
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
