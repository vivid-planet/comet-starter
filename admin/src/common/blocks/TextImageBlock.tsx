import { createTextImageBlock, DamImageBlock } from "@comet/cms-admin";

import { RichTextBlock } from "./RichTextBlock";

export const TextImageBlock = createTextImageBlock({ text: RichTextBlock, image: DamImageBlock });
