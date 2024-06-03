import {
    BlockData,
    BlockDataInterface,
    BlockInput,
    ChildBlock,
    ChildBlockInput,
    ColumnsBlockFactory,
    createBlock,
    ExtractBlockInput,
    inputToData,
} from "@comet/blocks-api";
import { ValidateNested } from "class-validator";

import { ColumnsContentBlock } from "./columns-content.block";

const ColumnsLayout = ColumnsBlockFactory.create(
    {
        layouts: [{ name: "2-20-2" }, { name: "4-16-4" }, { name: "6-12-6" }, { name: "9-9" }, { name: "12-6" }, { name: "6-12" }],
        contentBlock: ColumnsContentBlock,
    },
    "ColumnsLayout",
);

class ColumnsBlockData extends BlockData {
    @ChildBlock(ColumnsLayout)
    columns: BlockDataInterface;
}

class ColumnsBlockInput extends BlockInput {
    @ValidateNested()
    @ChildBlockInput(ColumnsLayout)
    columns: ExtractBlockInput<typeof ColumnsLayout>;

    transformToBlockData(): ColumnsBlockData {
        return inputToData(ColumnsBlockData, this);
    }
}

export const ColumnsBlock = createBlock(ColumnsBlockData, ColumnsBlockInput, {
    name: "Columns",
});
