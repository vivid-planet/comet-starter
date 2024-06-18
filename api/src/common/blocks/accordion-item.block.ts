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
import { IsUndefinable } from "@comet/cms-api";
import { AccordionContentBlock } from "@src/common/blocks/accordion-content.block";
import { IsBoolean, IsString } from "class-validator";

class AccordionItemBlockData extends BlockData {
    @BlockField({ nullable: true })
    title?: string;

    @ChildBlock(AccordionContentBlock)
    content: BlockDataInterface;

    @BlockField()
    openByDefault: boolean;
}

class AccordionItemBlockInput extends BlockInput {
    @IsUndefinable()
    @BlockField({ nullable: true })
    @IsString()
    title?: string;

    @ChildBlockInput(AccordionContentBlock)
    content: ExtractBlockInput<typeof AccordionContentBlock>;

    @IsBoolean()
    @BlockField()
    openByDefault: boolean;

    transformToBlockData(): AccordionItemBlockData {
        return inputToData(AccordionItemBlockData, this);
    }
}

export const AccordionItemBlock = createBlock(AccordionItemBlockData, AccordionItemBlockInput, "AccordionItem");
