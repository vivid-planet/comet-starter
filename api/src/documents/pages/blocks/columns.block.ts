import { ColumnsBlockFactory, createBlocksBlock } from "@comet/blocks-api";
import { AnchorBlock } from "@comet/cms-api";
import { AccordionBlock } from "@src/common/blocks/accordion.block";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { MediaGalleryBlock } from "@src/common/blocks/media-gallery.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { SpaceBlock } from "@src/common/blocks/space.block";
import { StandaloneHeadingBlock } from "@src/common/blocks/standalone-heading.block";
import { StandaloneMediaBlock } from "@src/common/blocks/standalone-media.block";

const ColumnsContentBlock = createBlocksBlock(
    {
        supportedBlocks: {
            accordion: AccordionBlock,
            anchor: AnchorBlock,
            richtext: RichTextBlock,
            space: SpaceBlock,
            heading: StandaloneHeadingBlock,
            callToActionList: CallToActionListBlock,
            media: StandaloneMediaBlock,
            mediaGallery: MediaGalleryBlock,
        },
    },
    {
        name: "ColumnsContent",
    },
);

export const ColumnsBlock = ColumnsBlockFactory.create(
    {
        layouts: [{ name: "2-20-2" }, { name: "4-16-4" }, { name: "9-6-9" }, { name: "9-9" }, { name: "12-6" }, { name: "6-12" }],
        contentBlock: ColumnsContentBlock,
    },
    "Columns",
);
