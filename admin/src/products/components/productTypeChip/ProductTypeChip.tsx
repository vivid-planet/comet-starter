import { Chip } from "@mui/material";
import { ChipIcon } from "@src/common/components/enums/chipIcon/ChipIcon";
import { EnumChip, type EnumChipProps } from "@src/common/components/enums/enumChip/EnumChip";
import { type GQLProductType } from "@src/graphql.generated";
import { ProductType, productTypeFormattedMessageMap } from "@src/products/components/productType/ProductType";
import { type FunctionComponent } from "react";

type ProductTypeChipProps = Pick<EnumChipProps<GQLProductType>, "loading" | "onSelectItem" | "value">;

const productTypeSortOrder: GQLProductType[] = ["Physical", "Digital", "Subscription"];

export const ProductTypeChip: FunctionComponent<ProductTypeChipProps> = ({ loading, onSelectItem, value }) => {
    return (
        <EnumChip<GQLProductType>
            chipMap={{
                Physical: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="default"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductType value="Physical" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Digital: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="primary"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductType value="Digital" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Subscription: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="secondary"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductType value="Subscription" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
            }}
            formattedMessageMap={productTypeFormattedMessageMap}
            loading={loading}
            onSelectItem={onSelectItem}
            sortOrder={productTypeSortOrder}
            value={value}
        />
    );
};
