import { loadMessages } from "@app/util/loadMessages";
import type { Route } from "./+types/blockPreview";
import { getSiteConfigForDomain } from "@app/util/siteConfig";
import { IntlProvider } from "@app/util/IntlProvider";
import { SiteConfigProvider } from "@app/util/SiteConfigProvider";
import { PageContentBlock } from "@app/documents/pages/blocks/PageContentBlock";
import { useEffect, useState, type ComponentType } from "react";
import { BlockPreviewProvider, IFrameBridgeProvider, useBlockPreviewFetch, useIFrameBridge } from "@comet/cms-site";
import { recursivelyLoadBlockData } from "@app/util/recursivelyLoadBlockData";

export async function loader({ params }: Route.LoaderArgs) {
    const siteConfig = getSiteConfigForDomain(params.domain);
    const messages = await loadMessages(params.language);
    return { siteConfig, messages };
}

const types: Record<string, { component: ComponentType<any>; blockType: string; }> = {
    page: {
        component: PageContentBlock,
        blockType: "PageContent",
        
    }
};

function PreviewPage({ loaderData, params }: Route.ComponentProps) { 
    const blockType = types[params.type];
    const iFrameBridge = useIFrameBridge();

    const { fetch, graphQLFetch } = useBlockPreviewFetch();

    const [blockData, setBlockData] = useState<any>();
    useEffect(() => {
        async function load() {
            if (!graphQLFetch) return;
            if (!iFrameBridge.block) {
                setBlockData(undefined);
                return;
            }
            const newData = await recursivelyLoadBlockData({
                blockType: blockType.blockType,
                blockData: iFrameBridge.block,
                graphQLFetch,
                fetch,
            });
            setBlockData(newData);
        }
        load();
    }, [iFrameBridge.block, fetch, graphQLFetch]);

    return (
        <IntlProvider locale={params.language} messages={loaderData.messages}>
            <SiteConfigProvider siteConfig={loaderData.siteConfig}>
                <div>{blockData && <blockType.component data={blockData} />}</div>
            </SiteConfigProvider>
        </IntlProvider>
    );
}
export default function IFrameBridgePreviewPage(props: Route.ComponentProps) {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewPage {...props} />
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};
