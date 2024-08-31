import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { PublicEnvScript } from "next-runtime-env";

export default async function BlockPreviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <PublicEnvScript />
                <link href="/favicon.ico" rel="icon" />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
