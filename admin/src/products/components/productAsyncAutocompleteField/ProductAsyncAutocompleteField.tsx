import { useApolloClient } from "@apollo/client";
import { AsyncAutocompleteField, type AsyncAutocompleteFieldProps } from "@comet/admin";
import { useContentScope } from "@comet/cms-admin";
import { type FunctionComponent } from "react";

import { productAsyncAutocompleteFieldQuery } from "./ProductAsyncAutocompleteField.gql";
import {
    type GQLProductAsyncAutocompleteFieldProductFragment,
    type GQLProductAsyncAutocompleteFieldQuery,
    type GQLProductAsyncAutocompleteFieldQueryVariables,
} from "./ProductAsyncAutocompleteField.gql.generated";

type ProductAsyncAutocompleteFieldOption = GQLProductAsyncAutocompleteFieldProductFragment;

type ProductAsyncAutocompleteFieldProps = Omit<
    AsyncAutocompleteFieldProps<ProductAsyncAutocompleteFieldOption, false, true, false>,
    "loadOptions"
> & {
    excludeId?: string;
};

export const ProductAsyncAutocompleteField: FunctionComponent<ProductAsyncAutocompleteFieldProps> = ({
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
                const { data } = await client.query<GQLProductAsyncAutocompleteFieldQuery, GQLProductAsyncAutocompleteFieldQueryVariables>({
                    query: productAsyncAutocompleteFieldQuery,
                    variables: {
                        scope,
                        search,
                        filter: excludeId ? { id: { notEqual: excludeId } } : undefined,
                    },
                });
                return data.products.nodes;
            }}
        />
    );
};
