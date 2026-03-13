import { SelectField, type SelectFieldProps } from "@comet/admin";
import { recordToOptions } from "@src/common/components/enums/recordToOptions/recordToOptions";
import { type GQLProductStatus } from "@src/graphql.generated";
import { productStatusFormattedMessageMap } from "@src/products/components/productStatus/ProductStatus";
import { type FunctionComponent } from "react";

export type ProductStatusFormState = GQLProductStatus;

type ProductStatusSelectFieldProps = Omit<SelectFieldProps<ProductStatusFormState>, "options">;

export const ProductStatusSelectField: FunctionComponent<ProductStatusSelectFieldProps> = ({ name, ...restProps }) => {
    return <SelectField name={name} {...restProps} options={recordToOptions(productStatusFormattedMessageMap)} />;
};
