import "@comet/site-nextjs/css";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import "@src/styles/global.scss";

import { ErrorHandler } from "@src/util/ErrorHandler";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { type ReactNode } from "react";

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <StyledComponentsRegistry>
            <ErrorHandler>{children}</ErrorHandler>
        </StyledComponentsRegistry>
    );
}
