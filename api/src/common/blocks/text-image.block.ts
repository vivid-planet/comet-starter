import { createTextImageBlock, DamImageBlock } from "@comet/cms-api";

import { RichTextBlock } from "./rich-text.block";

export const TextImageBlock = createTextImageBlock({ text: RichTextBlock, image: DamImageBlock });
