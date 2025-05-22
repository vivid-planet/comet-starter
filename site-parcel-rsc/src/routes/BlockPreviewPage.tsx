"use server-entry";

import { BlockPreview, BlockPreviewProps } from "./BlockPreview";
import '../client';

export function BlockPreviewPage(props: BlockPreviewProps) {
    return <BlockPreview {...props} />
}