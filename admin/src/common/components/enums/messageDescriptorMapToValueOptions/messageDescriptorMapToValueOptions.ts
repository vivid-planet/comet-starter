import { type IntlShape, type MessageDescriptor } from "react-intl";

type ValueOption<T extends string> = {
    value: T;
    label: string;
};

export function messageDescriptorMapToValueOptions<T extends string>(map: Record<T, MessageDescriptor>, intl: IntlShape): Array<ValueOption<T>> {
    return (Object.entries(map) as Array<[T, MessageDescriptor]>).map(([value, descriptor]) => ({
        value,
        label: intl.formatMessage(descriptor),
    }));
}
