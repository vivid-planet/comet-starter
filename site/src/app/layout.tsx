import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import "./global.css";

import { ReactNode } from "react";

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>{children}</>;
}
