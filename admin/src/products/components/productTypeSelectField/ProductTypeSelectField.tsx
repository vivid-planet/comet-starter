import { SelectField, type SelectFieldProps } from "@comet/admin";
import { recordToOptions } from "@src/common/components/enums/recordToOptions/recordToOptions";
import { type GQLProductType } from "@src/graphql.generated";
import { productTypeFormattedMessageMap } from "@src/products/components/productType/ProductType";
import { type FunctionComponent } from "react";

export type ProductTypeFormState = GQLProductType;

type ProductTypeSelectFieldProps = Omit<SelectFieldProps<ProductTypeFormState>, "options">;

export const ProductTypeSelectField: FunctionComponent<ProductTypeSelectFieldProps> = ({ name, ...restProps }) => {
    return <SelectField name={name} {...restProps} options={recordToOptions(productTypeFormattedMessageMap)} />;
};
