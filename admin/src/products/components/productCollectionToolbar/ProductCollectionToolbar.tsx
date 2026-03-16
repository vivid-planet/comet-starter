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
import { CollectionType } from "@src/products/components/collectionType/CollectionType";
import { type FunctionComponent, type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { productCollectionToolbarQuery } from "./ProductCollectionToolbar.gql";
import { type GQLProductCollectionToolbarQuery, type GQLProductCollectionToolbarQueryVariables } from "./ProductCollectionToolbar.gql.generated";

interface ProductCollectionToolbarProps {
    id?: string;
    additionalActions?: ReactNode;
}

export const ProductCollectionToolbar: FunctionComponent<ProductCollectionToolbarProps> = ({ id, additionalActions }) => {
    const theme = useTheme();

    const { data, loading, error } = useQuery<GQLProductCollectionToolbarQuery, GQLProductCollectionToolbarQueryVariables>(
        productCollectionToolbarQuery,
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

    const title = data?.productCollection.name;

    return (
        <StackPageTitle title={title}>
            <StackToolbar scopeIndicator={<ContentScopeIndicator />}>
                <ToolbarBackButton />

                {title ? (
                    <ToolbarItem>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <Typography variant="h5">{title}</Typography>
                            {data?.productCollection.collectionType && (
                                <Typography color={theme.palette.grey["400"]} variant="body2">
                                    <CollectionType value={data.productCollection.collectionType} />
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
                                        <FormattedMessage id="productCollections.toolbar.error.title" defaultMessage="Data could not be loaded." />
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        <FormattedMessage
                                            id="productCollections.toolbar.error.description"
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
