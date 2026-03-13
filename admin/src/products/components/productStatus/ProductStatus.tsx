import { createTranslatableEnum } from "@src/common/components/enums/createTranslatableEnum/createTranslatableEnum";
import { type GQLProductStatus } from "@src/graphql.generated";
import { defineMessage } from "react-intl";

const {
    messageDescriptorMap,
    formattedMessageMap,
    Component: ProductStatus,
} = createTranslatableEnum<GQLProductStatus>({
    Draft: defineMessage({ defaultMessage: "Draft", id: "products.productStatus.draft" }),
    InReview: defineMessage({ defaultMessage: "In Review", id: "products.productStatus.inReview" }),
    Published: defineMessage({ defaultMessage: "Published", id: "products.productStatus.published" }),
    Archived: defineMessage({ defaultMessage: "Archived", id: "products.productStatus.archived" }),
});

export { ProductStatus, formattedMessageMap as productStatusFormattedMessageMap, messageDescriptorMap as productStatusMessageDescriptorMap };
