import "@comet/site-nextjs/css";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ErrorHandler } from "@src/util/ErrorHandler";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { type ReactNode } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <StyledComponentsRegistry>
            <GlobalStyle />
            <ResponsiveSpacingStyle />
            <ErrorHandler>{children}</ErrorHandler>
        </StyledComponentsRegistry>
    );
}
