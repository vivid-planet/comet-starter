import { useApolloClient } from "@apollo/client";
import { AsyncAutocompleteField, type AsyncAutocompleteFieldProps } from "@comet/admin";
import { useContentScope } from "@comet/cms-admin";
import { type FunctionComponent } from "react";

import { productCategoryAsyncAutocompleteFieldQuery } from "./ProductCategoryAsyncAutocompleteField.gql";
import {
    type GQLProductCategoryAsyncAutocompleteFieldProductCategoryFragment,
    type GQLProductCategoryAsyncAutocompleteFieldQuery,
    type GQLProductCategoryAsyncAutocompleteFieldQueryVariables,
} from "./ProductCategoryAsyncAutocompleteField.gql.generated";

export type ProductCategoryAsyncAutocompleteFieldOption = GQLProductCategoryAsyncAutocompleteFieldProductCategoryFragment;

type ProductCategoryAsyncAutocompleteFieldProps = Omit<
    AsyncAutocompleteFieldProps<ProductCategoryAsyncAutocompleteFieldOption, false, true, false>,
    "loadOptions"
> & {
    excludeId?: string;
};

export const ProductCategoryAsyncAutocompleteField: FunctionComponent<ProductCategoryAsyncAutocompleteFieldProps> = ({
    name,
    excludeId,
    clearable = true,
    disabled = false,
    variant = "horizontal",
    fullWidth = true,
    ...restProps
}) => {
    const client = useApolloClient();
    const { scope } = useContentScope();

    return (
        <AsyncAutocompleteField
            name={name}
            clearable={disabled ? false : clearable}
            disabled={disabled}
            variant={variant}
            fullWidth={fullWidth}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            {...restProps}
            loadOptions={async (search) => {
                const { data } = await client.query<
                    GQLProductCategoryAsyncAutocompleteFieldQuery,
                    GQLProductCategoryAsyncAutocompleteFieldQueryVariables
                >({
                    query: productCategoryAsyncAutocompleteFieldQuery,
                    variables: {
                        scope,
                        search,
                        filter: excludeId ? { id: { notEqual: excludeId } } : undefined,
                    },
                });
                return data.productCategories.nodes;
            }}
        />
    );
};
