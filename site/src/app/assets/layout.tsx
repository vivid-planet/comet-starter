import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    notFound();
}
