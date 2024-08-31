"use client";
import { BlockPreviewProvider, IFrameBridgeProvider, useIFrameBridge } from "@comet/cms-site";
import { ContentScope } from "@src/../../site-configs.d";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import { IntlProvider } from "react-intl";

const StagePreview = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageBlock data={stage} /> : null;
};

function StagePreviewWrapper() {
    const { contentScope } = useIFrameBridge() as { contentScope?: ContentScope };
    if (!contentScope) return null;
    return (
        <IntlProvider defaultLocale={contentScope.language} locale={contentScope.language}>
            <StagePreview />
        </IntlProvider>
    );
}
const StagePreviewPage = () => (
    <IFrameBridgeProvider>
        <BlockPreviewProvider>
            <StagePreviewWrapper />
        </BlockPreviewProvider>
    </IFrameBridgeProvider>
);

export default StagePreviewPage;
