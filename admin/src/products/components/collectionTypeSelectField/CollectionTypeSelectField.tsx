import { SelectField, type SelectFieldProps } from "@comet/admin";
import { recordToOptions } from "@src/common/components/enums/recordToOptions/recordToOptions";
import { type GQLCollectionType } from "@src/graphql.generated";
import { collectionTypeFormattedMessageMap } from "@src/products/components/collectionType/CollectionType";
import { type FunctionComponent } from "react";

type CollectionTypeFormState = GQLCollectionType;

type CollectionTypeSelectFieldProps = Omit<SelectFieldProps<CollectionTypeFormState>, "options">;

export const CollectionTypeSelectField: FunctionComponent<CollectionTypeSelectFieldProps> = ({ name, ...restProps }) => {
    return <SelectField name={name} {...restProps} options={recordToOptions(collectionTypeFormattedMessageMap)} />;
};
