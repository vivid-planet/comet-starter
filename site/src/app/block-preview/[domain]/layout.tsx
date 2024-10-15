export const dynamic = "force-dynamic";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { PropsWithChildren } from "react";

export default async function BlockPreviewLayout({ children, params: { domain } }: Readonly<PropsWithChildren<{ params: { domain: string } }>>) {
    const siteConfig = await getSiteConfigForDomain(domain);
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    <SiteConfigProvider siteConfig={siteConfig}>{children}</SiteConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
