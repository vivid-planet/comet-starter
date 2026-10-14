"use client";

import { PreviewContext, sendSitePreviewIFrameMessage, SitePreviewIFrameMessageType } from "@dextinity/site-react";
import { usePathname, useSearchParams } from "@src/framework/client/router";
import { type PropsWithChildren, useEffect } from "react";

/**
 * Port of SitePreviewProvider from @dextinity/site-nextjs (which uses next/navigation): reports the current location to the
 * Dextinity admin and marks blocks as rendered in the site preview.
 */
export function SitePreviewProvider({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        function sendLocation() {
            sendSitePreviewIFrameMessage({
                dextinityType: SitePreviewIFrameMessageType.SitePreviewLocation,
                data: { search: searchParams.toString(), pathname },
            });
        }
        sendLocation();
        window.addEventListener("load", sendLocation);
        return () => {
            window.removeEventListener("load", sendLocation);
        };
    }, [pathname, searchParams]);

    return <PreviewContext.Provider value={{ previewType: "SitePreview", showPreviewSkeletons: false }}>{children}</PreviewContext.Provider>;
}
