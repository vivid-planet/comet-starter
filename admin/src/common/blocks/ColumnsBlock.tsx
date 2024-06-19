import { ColumnsLayoutPreview, ColumnsLayoutPreviewContent, ColumnsLayoutPreviewSpacing, createColumnsBlock } from "@comet/blocks-admin";
import { ColumnsContentBlock } from "@src/common/blocks/ColumnsContentBlock";
import { FormattedMessage } from "react-intl";

const oneColumnLayouts = [
    {
        name: "2-20-2",
        columns: 1,
        label: <FormattedMessage id="columnsBlock.center.large" defaultMessage="Center large" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={20} />
                <ColumnsLayoutPreviewSpacing width={2} />
            </ColumnsLayoutPreview>
        ),
    },
    {
        name: "4-16-4",
        columns: 1,
        label: <FormattedMessage id="columnsBlock.center.medium" defaultMessage="Center medium" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={4} />
                <ColumnsLayoutPreviewContent width={16} />
                <ColumnsLayoutPreviewSpacing width={4} />
            </ColumnsLayoutPreview>
        ),
    },
    {
        name: "9-6-9",
        columns: 1,
        label: <FormattedMessage id="columnsBlock.center.small" defaultMessage="Center small" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={9} />
                <ColumnsLayoutPreviewContent width={6} />
                <ColumnsLayoutPreviewSpacing width={9} />
            </ColumnsLayoutPreview>
        ),
    },
];

const twoColumnLayouts = [
    {
        name: "9-9",
        columns: 2,
        label: <FormattedMessage id="columnsBlock.sameWidth.normal" defaultMessage="Same width" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={9} />
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={9} />
                <ColumnsLayoutPreviewSpacing width={2} />
            </ColumnsLayoutPreview>
        ),
        section: {
            name: "sameWidth",
            label: <FormattedMessage id="columnsBlock.sameWidth" defaultMessage="Same width" />,
        },
    },
    {
        name: "12-6",
        columns: 2,
        label: <FormattedMessage id="columnsBlock.weightedLeft" defaultMessage="Weighted left" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={12} />
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={6} />
                <ColumnsLayoutPreviewSpacing width={2} />
            </ColumnsLayoutPreview>
        ),
        section: {
            name: "differentWidth",
            label: <FormattedMessage id="columnsBlock.differentWidth" defaultMessage="Different width" />,
        },
    },
    {
        name: "6-12",
        columns: 2,
        label: <FormattedMessage id="columnsBlock.weightedRight" defaultMessage="Weighted right" />,
        preview: (
            <ColumnsLayoutPreview>
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={6} />
                <ColumnsLayoutPreviewSpacing width={2} />
                <ColumnsLayoutPreviewContent width={12} />
                <ColumnsLayoutPreviewSpacing width={2} />
            </ColumnsLayoutPreview>
        ),
        section: {
            name: "differentWidth",
            label: <FormattedMessage id="columnsBlock.differentWidth" defaultMessage="Different width" />,
        },
    },
];

export const ColumnsBlock = createColumnsBlock({
    name: "Columns",
    displayName: <FormattedMessage id="columnsBlock.displayName" defaultMessage="Columns" />,
    contentBlock: ColumnsContentBlock,
    layouts: [...oneColumnLayouts, ...twoColumnLayouts],
});
