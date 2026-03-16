import { createTranslatableEnum } from "@src/common/components/enums/createTranslatableEnum/createTranslatableEnum";
import { type GQLRating } from "@src/graphql.generated";
import { defineMessage } from "react-intl";

const { formattedMessageMap, Component: Rating } = createTranslatableEnum<GQLRating>({
    One: defineMessage({ defaultMessage: "1", id: "products.rating.one" }),
    Two: defineMessage({ defaultMessage: "2", id: "products.rating.two" }),
    Three: defineMessage({ defaultMessage: "3", id: "products.rating.three" }),
    Four: defineMessage({ defaultMessage: "4", id: "products.rating.four" }),
    Five: defineMessage({ defaultMessage: "5", id: "products.rating.five" }),
});

export { Rating, formattedMessageMap as ratingFormattedMessageMap };
