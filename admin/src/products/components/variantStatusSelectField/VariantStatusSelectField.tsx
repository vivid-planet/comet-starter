import { SelectField, type SelectFieldProps } from "@comet/admin";
import { recordToOptions } from "@src/common/components/enums/recordToOptions/recordToOptions";
import { type GQLVariantStatus } from "@src/graphql.generated";
import { variantStatusFormattedMessageMap } from "@src/products/components/variantStatus/VariantStatus";
import { type FunctionComponent } from "react";

type VariantStatusFormState = GQLVariantStatus;

type VariantStatusSelectFieldProps = Omit<SelectFieldProps<VariantStatusFormState>, "options">;

export const VariantStatusSelectField: FunctionComponent<VariantStatusSelectFieldProps> = ({ name, ...restProps }) => {
    return <SelectField name={name} {...restProps} options={recordToOptions(variantStatusFormattedMessageMap)} />;
};
