import { BlockPreviewProvider, IFrameBridgeProvider, useIFrameBridge } from "@comet/cms-site";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";

const StagePreview = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageBlock data={stage} /> : null;
};

const StagePreviewPage = () => (
    <IFrameBridgeProvider>
        <BlockPreviewProvider>
            <StagePreview />
        </BlockPreviewProvider>
    </IFrameBridgeProvider>
);

export default StagePreviewPage;
