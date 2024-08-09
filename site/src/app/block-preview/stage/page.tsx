"use client";
import { BlockPreviewProvider, IFrameBridgeProvider, useIFrameBridge } from "@comet/cms-site";
import { StageListBlock } from "@src/documents/pages/blocks/StageListBlock";

const StagePreview = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageListBlock data={stage} /> : null;
};

const StagePreviewPage = () => (
    <IFrameBridgeProvider>
        <BlockPreviewProvider>
            <StagePreview />
        </BlockPreviewProvider>
    </IFrameBridgeProvider>
);

export default StagePreviewPage;
