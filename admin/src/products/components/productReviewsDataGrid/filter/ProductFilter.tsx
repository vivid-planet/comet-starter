import { useQuery } from "@apollo/client";
import { ClearInputAdornment } from "@comet/admin";
import { useContentScope } from "@comet/cms-admin";
import Autocomplete from "@mui/material/Autocomplete";
import { type GridFilterInputValueProps, type GridFilterOperator, useGridRootProps } from "@mui/x-data-grid-pro";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useDebounce } from "use-debounce";

import { productFilterQuery } from "./ProductFilter.gql";
import { type GQLProductFilterQuery, type GQLProductFilterQueryVariables } from "./ProductFilter.gql.generated";

function ProductFilter({ item, applyValue, apiRef }: GridFilterInputValueProps) {
    const intl = useIntl();
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [debouncedSearch] = useDebounce(search, 500);
    const rootProps = useGridRootProps();
    const { scope } = useContentScope();

    const { data } = useQuery<GQLProductFilterQuery, GQLProductFilterQueryVariables>(productFilterQuery, {
        variables: {
            scope,
            offset: 0,
            limit: 10,
            search: debouncedSearch,
        },
    });

    const handleApplyValue = useCallback(
        (value: string | undefined) => {
            applyValue({
                ...item,
                id: item.id,
                operator: "equals",
                value,
            });
        },
        [applyValue, item],
    );

    return (
        <Autocomplete
            size="small"
            options={data?.products.nodes ?? []}
            autoHighlight
            value={item.value ? item.value : null}
            filterOptions={(x) => x}
            disableClearable
            isOptionEqualToValue={(option, value) => option.id == value}
            getOptionLabel={(option) => {
                return option.name ?? data?.products.nodes.find((p) => p.id === option)?.name ?? option;
            }}
            onChange={(event, value, reason) => {
                handleApplyValue(value ? value.id : undefined);
            }}
            renderInput={(params) => (
                <rootProps.slots.baseTextField
                    {...params}
                    autoComplete="off"
                    placeholder={intl.formatMessage({
                        id: "productReview.productFilter.placeholder",
                        defaultMessage: "Choose a product",
                    })}
                    value={search ? search : null}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                    label={apiRef.current.getLocaleText("filterPanelInputLabel")}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    <ClearInputAdornment
                                        position="end"
                                        hasClearableContent={Boolean(item.value)}
                                        onClick={() => handleApplyValue(undefined)}
                                    />
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        },
                    }}
                />
            )}
        />
    );
}

export const ProductFilterOperators: GridFilterOperator[] = [
    {
        value: "equals",
        getApplyFilterFn: () => {
            throw new Error("not implemented, we filter server side");
        },
        InputComponent: ProductFilter,
    },
];
