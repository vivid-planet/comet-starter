import { GlobalStyle } from "@src/layout/GlobalStyle";
import { getSiteConfigs } from "@src/middleware";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";

import { SiteConfigsProvider } from "./SiteConfigsProvider";

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
