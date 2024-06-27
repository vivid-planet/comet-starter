import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Comet Starter",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}
