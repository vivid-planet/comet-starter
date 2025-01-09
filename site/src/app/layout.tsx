import "./global.scss";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StyledComponentsRegistry>
            <GlobalStyle />
            <ResponsiveSpacingStyle />
            {children}
        </StyledComponentsRegistry>
    );
}
