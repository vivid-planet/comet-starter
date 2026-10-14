import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import { isSitePreviewEnabled } from "@src/util/sitePreview";
import { SitePreviewProvider } from "@src/util/SitePreviewProvider";
import type { PropsWithChildren } from "react";

export async function SiteLayout({ children, domain }: PropsWithChildren<{ domain: string }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    const isSitePreview = await isSitePreviewEnabled();

    return (
        <SiteConfigProvider siteConfig={siteConfig}>
            {isSitePreview ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
        </SiteConfigProvider>
    );
}
