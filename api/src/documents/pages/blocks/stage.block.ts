import { createOneOfBlock } from "@comet/blocks-api";
import { BasicStageBlock } from "@src/documents/pages/blocks/basic-stage.block";

export const StageBlock = createOneOfBlock(
    {
        supportedBlocks: {
            basicStage: BasicStageBlock,
        },
    },
    "Stage",
);
