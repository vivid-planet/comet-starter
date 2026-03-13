import { Chip } from "@mui/material";
import { ChipIcon } from "@src/common/components/enums/chipIcon/ChipIcon";
import { EnumChip, type EnumChipProps } from "@src/common/components/enums/enumChip/EnumChip";
import { type GQLProductStatus } from "@src/graphql.generated";
import { ProductStatus, productStatusFormattedMessageMap } from "@src/products/components/productStatus/ProductStatus";
import { type FunctionComponent } from "react";

type ProductStatusChipProps = Pick<EnumChipProps<GQLProductStatus>, "loading" | "onSelectItem" | "value">;

const productStatusSortOrder: GQLProductStatus[] = ["Draft", "InReview", "Published", "Archived"];

export const ProductStatusChip: FunctionComponent<ProductStatusChipProps> = ({ loading, onSelectItem, value }) => {
    return (
        <EnumChip<GQLProductStatus>
            chipMap={{
                Draft: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="warning"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductStatus value="Draft" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                InReview: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="info"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductStatus value="InReview" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Published: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="success"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductStatus value="Published" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Archived: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="error"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<ProductStatus value="Archived" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
            }}
            formattedMessageMap={productStatusFormattedMessageMap}
            loading={loading}
            onSelectItem={onSelectItem}
            sortOrder={productStatusSortOrder}
            value={value}
        />
    );
};
