import { createOneOfBlock } from "@comet/blocks-api";

import { BasicStageBlock } from "./basic-stage.block";

export const StageBlock = createOneOfBlock(
    {
        supportedBlocks: {
            basicStage: BasicStageBlock,
        },
    },
    "Stage",
);
