import {
    BlockData,
    BlockDataInterface,
    BlockField,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    createBlock,
    ExtractBlockInput,
    inputToData,
} from "@comet/blocks-api";
import { CallToActionListBlock } from "@src/common/blocks/call-to-action-list.block";
import { HeadingBlock } from "@src/common/blocks/heading.block";
import { MediaBlock } from "@src/common/blocks/media.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { IsEnum } from "class-validator";

enum BackgroundOpacity {
    percentage100 = "100",
    percentage90 = "90",
    percentage80 = "80",
    percentage70 = "70",
    percentage60 = "60",
    percentage50 = "50",
    percentage40 = "40",
    percentage30 = "30",
    percentage20 = "20",
    percentage10 = "10",
}

class BillboardTeaserBlockData extends BlockData {
    @ChildBlock(MediaBlock)
    media: BlockDataInterface;

    @ChildBlock(HeadingBlock)
    heading: BlockDataInterface;

    @ChildBlock(RichTextBlock)
    text: BlockDataInterface;

    @BlockField({ type: "enum", enum: BackgroundOpacity })
    backgroundOpacity: BackgroundOpacity;

    @ChildBlock(CallToActionListBlock)
    callToActionList: BlockDataInterface;
}

class BillboardTeaserBlockInput extends BlockInput {
    @ChildBlockInput(MediaBlock)
    media: ExtractBlockInput<typeof MediaBlock>;

    @ChildBlockInput(HeadingBlock)
    heading: ExtractBlockInput<typeof HeadingBlock>;

    @ChildBlockInput(RichTextBlock)
    text: ExtractBlockInput<typeof RichTextBlock>;

    @IsEnum(BackgroundOpacity)
    @BlockField({ type: "enum", enum: BackgroundOpacity })
    backgroundOpacity: BackgroundOpacity;

    @ChildBlockInput(CallToActionListBlock)
    callToActionList: ExtractBlockInput<typeof CallToActionListBlock>;

    transformToBlockData(): BillboardTeaserBlockData {
        return inputToData(BillboardTeaserBlockData, this);
    }
}

export const BillboardTeaserBlock = createBlock(BillboardTeaserBlockData, BillboardTeaserBlockInput, "BillboardTeaser");
