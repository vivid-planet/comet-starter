import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const validatePositiveNumber = (value: number | undefined): ReactElement | undefined => {
    if (value == null) return undefined;
    if (value <= 0) {
        return <FormattedMessage id="validation.positiveNumber" defaultMessage="Value must be positive" />;
    }
    return undefined;
};
