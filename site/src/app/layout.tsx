import "@comet/site-nextjs/css";
import "@src/styles/global.scss";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

import { ErrorHandler } from "@src/util/ErrorHandler";
import { type ReactNode } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return <ErrorHandler>{children}</ErrorHandler>;
}
