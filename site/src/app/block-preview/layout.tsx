export const dynamic = "force-dynamic";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { SiteConfigsProvider } from "@src/util/blockPreview";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import { getSiteConfigs } from "@src/util/siteConfig";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";

export default async function BlockPreviewLayout({ children }: { children: React.ReactNode }) {
    const siteConfigs = getSiteConfigs();
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    <SiteConfigsProvider siteConfigs={siteConfigs}>{children}</SiteConfigsProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
