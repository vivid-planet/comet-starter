"use client";
import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from "@comet/cms-site";
import { PageContentBlockData } from "@src/blocks.generated";
import { PageContentBlock } from "@src/documents/pages/blocks/PageContentBlock";
import { StageBlock } from "@src/documents/pages/blocks/StageBlock";
import type { ContentScope, PublicSiteConfig } from "@src/site-configs";
import { graphQLApiUrl } from "@src/util/graphQLClient";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const PagePreview: React.FunctionComponent = () => {
    const iFrameBridge = useIFrameBridge();

    const { fetch, graphQLFetch } = useBlockPreviewFetch(graphQLApiUrl);

    const [blockData, setBlockData] = useState<PageContentBlockData>();
    useEffect(() => {
        async function load() {
            if (!iFrameBridge.block) {
                setBlockData(undefined);
                return;
            }
            const newData = await recursivelyLoadBlockData({
                blockType: "PageContent",
                blockData: iFrameBridge.block,
                graphQLFetch,
                fetch,
            });
            setBlockData(newData);
        }
        load();
    }, [iFrameBridge.block, fetch, graphQLFetch]);

    return <div>{blockData && <PageContentBlock data={blockData} />}</div>;
};

const StagePreview = () => {
    const { block: stage } = useIFrameBridge();
    return stage ? <StageBlock data={stage} /> : null;
};

const previewComponents = {
    page: PagePreview,
    stage: StagePreview,
};

const PreviewWrapper = ({ type }: { type: string }) => {
    const iFrameBridge = useIFrameBridge();
    const siteConfigs = useContext(SiteConfigsContext);
    if (!iFrameBridge.contentScope) return;
    const contentScope = iFrameBridge.contentScope as ContentScope;
    const siteConfig = siteConfigs.find((siteConfig) => siteConfig.scope.domain === contentScope.domain);

    const PreviewComponent = previewComponents[type];
    return (
        <SiteConfigProvider siteConfig={siteConfig}>
            <PreviewComponent />
        </SiteConfigProvider>
    );
};

const SiteConfigsContext = createContext<PublicSiteConfig[]>([]);

export function SiteConfigsProvider({ children, siteConfigs }: PropsWithChildren<{ siteConfigs: PublicSiteConfig[] }>) {
    return <SiteConfigsContext.Provider value={siteConfigs}>{children}</SiteConfigsContext.Provider>;
}

const PreviewPage = ({ params }: { params: { type: string } }) => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewWrapper type={params.type} />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};

export default PreviewPage;
