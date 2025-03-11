import { type RichTextBlockData } from "../../blocks.generated";

export const hasRichTextBlockContent = (data: RichTextBlockData) => {
    const draftContent = data.draftContent as any; // as RawDraftContentState;
    return !(draftContent.blocks.length === 0 || (draftContent.blocks.length === 1 && draftContent.blocks[0].text === ""));
};
