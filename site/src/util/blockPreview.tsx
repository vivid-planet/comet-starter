"use client";

import { BlockPreviewProvider, IFrameBridgeProvider, useIFrameBridge } from "@comet/cms-site";
import type { ContentScope, PublicSiteConfig } from "@src/site-configs";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

const SiteConfigsContext = createContext<PublicSiteConfig[]>([]);

export function SiteConfigsProvider({ children, siteConfigs }: PropsWithChildren<{ siteConfigs: PublicSiteConfig[] }>) {
    return <SiteConfigsContext.Provider value={siteConfigs}>{children}</SiteConfigsContext.Provider>;
}

const PreviewWrapper = ({ children }: React.PropsWithChildren) => {
    const iFrameBridge = useIFrameBridge();
    const siteConfigs = useContext(SiteConfigsContext);
    if (!iFrameBridge.contentScope) return;
    const contentScope = iFrameBridge.contentScope as ContentScope;
    const siteConfig = siteConfigs.find((siteConfig) => siteConfig.scope.domain === contentScope.domain);

    return <SiteConfigProvider siteConfig={siteConfig}>{children}</SiteConfigProvider>;
};

export const withBlockPreview = (Component: FunctionComponent) => () => {
    return (
        <IFrameBridgeProvider>
            <BlockPreviewProvider>
                <PreviewWrapper>
                    <Component />
                </PreviewWrapper>
            </BlockPreviewProvider>
        </IFrameBridgeProvider>
    );
};
