import { SelectField, type SelectFieldProps } from "@comet/admin";
import { recordToOptions } from "@src/common/components/enums/recordToOptions/recordToOptions";
import { type GQLRating } from "@src/graphql.generated";
import { ratingFormattedMessageMap } from "@src/products/components/rating/Rating";
import { type FunctionComponent } from "react";

type RatingFormState = GQLRating;

type RatingSelectFieldProps = Omit<SelectFieldProps<RatingFormState>, "options">;

export const RatingSelectField: FunctionComponent<RatingSelectFieldProps> = ({ name, ...restProps }) => {
    return <SelectField name={name} {...restProps} options={recordToOptions(ratingFormattedMessageMap)} />;
};
