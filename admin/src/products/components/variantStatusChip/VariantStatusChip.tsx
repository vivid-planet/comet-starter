import { Chip } from "@mui/material";
import { ChipIcon } from "@src/common/components/enums/chipIcon/ChipIcon";
import { EnumChip, type EnumChipProps } from "@src/common/components/enums/enumChip/EnumChip";
import { type GQLVariantStatus } from "@src/graphql.generated";
import { VariantStatus, variantStatusFormattedMessageMap } from "@src/products/components/variantStatus/VariantStatus";
import { type FunctionComponent } from "react";

type VariantStatusChipProps = Pick<EnumChipProps<GQLVariantStatus>, "loading" | "onSelectItem" | "value">;

const variantStatusSortOrder: GQLVariantStatus[] = ["Active", "OutOfStock", "Discontinued"];

export const VariantStatusChip: FunctionComponent<VariantStatusChipProps> = ({ loading, onSelectItem, value }) => {
    return (
        <EnumChip<GQLVariantStatus>
            chipMap={{
                Active: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="success"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<VariantStatus value="Active" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                OutOfStock: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="warning"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<VariantStatus value="OutOfStock" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Discontinued: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="error"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<VariantStatus value="Discontinued" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
            }}
            formattedMessageMap={variantStatusFormattedMessageMap}
            loading={loading}
            onSelectItem={onSelectItem}
            sortOrder={variantStatusSortOrder}
            value={value}
        />
    );
};
