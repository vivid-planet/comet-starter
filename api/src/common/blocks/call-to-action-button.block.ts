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
import { IsEnum } from "class-validator";

import { TextLinkBlock } from "./text-link.block";

enum Variant {
    Contained = "Contained",
    Outlined = "Outlined",
    Text = "Text",
}

class CallToActionButtonBlockData extends BlockData {
    @ChildBlock(TextLinkBlock)
    textLink: BlockDataInterface;

    @BlockField({ type: "enum", enum: Variant })
    variant: Variant;
}

class CallToActionButtonBlockInput extends BlockInput {
    @ChildBlockInput(TextLinkBlock)
    textLink: ExtractBlockInput<typeof TextLinkBlock>;

    @IsEnum(Variant)
    @BlockField({ type: "enum", enum: Variant })
    variant: Variant;

    transformToBlockData(): CallToActionButtonBlockData {
        return inputToData(CallToActionButtonBlockData, this);
    }
}

export const CallToActionButtonBlock = createBlock(CallToActionButtonBlockData, CallToActionButtonBlockInput, "CallToActionButton");
