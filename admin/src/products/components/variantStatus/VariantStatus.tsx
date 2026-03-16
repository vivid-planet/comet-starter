import { createTranslatableEnum } from "@src/common/components/enums/createTranslatableEnum/createTranslatableEnum";
import { type GQLVariantStatus } from "@src/graphql.generated";
import { defineMessage } from "react-intl";

const {
    messageDescriptorMap,
    formattedMessageMap,
    Component: VariantStatus,
} = createTranslatableEnum<GQLVariantStatus>({
    Active: defineMessage({ defaultMessage: "Active", id: "products.variantStatus.active" }),
    OutOfStock: defineMessage({ defaultMessage: "Out of Stock", id: "products.variantStatus.outOfStock" }),
    Discontinued: defineMessage({ defaultMessage: "Discontinued", id: "products.variantStatus.discontinued" }),
});

export { VariantStatus, formattedMessageMap as variantStatusFormattedMessageMap, messageDescriptorMap as variantStatusMessageDescriptorMap };
