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
import { DamImageBlock, IsUndefinable } from "@comet/cms-api";
import { LinkListBlock } from "@src/common/blocks/link-list.block";
import { RichTextBlock } from "@src/common/blocks/rich-text.block";
import { IsString } from "class-validator";

class FooterContentBlockData extends BlockData {
    @ChildBlock(RichTextBlock)
    text: ExtractBlockInput<typeof RichTextBlock>;

    @ChildBlock(DamImageBlock)
    image: BlockDataInterface;

    @ChildBlock(LinkListBlock)
    linkList: BlockDataInterface;

    @BlockField({ nullable: true })
    copyrightNotice?: string;
}

class FooterContentBlockInput extends BlockInput {
    @ChildBlockInput(RichTextBlock)
    text: ExtractBlockInput<typeof RichTextBlock>;

    @ChildBlockInput(DamImageBlock)
    image: ExtractBlockInput<typeof DamImageBlock>;

    @ChildBlockInput(LinkListBlock)
    linkList: ExtractBlockInput<typeof LinkListBlock>;

    @BlockField({ nullable: true })
    @IsUndefinable()
    @IsString()
    copyrightNotice?: string;

    transformToBlockData(): FooterContentBlockData {
        return inputToData(FooterContentBlockData, this);
    }
}

export const FooterContentBlock = createBlock(FooterContentBlockData, FooterContentBlockInput, {
    name: "FooterContent",
});
