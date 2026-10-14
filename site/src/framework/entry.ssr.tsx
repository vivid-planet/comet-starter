import { createFromReadableStream, getClientEntryUrl } from "@vitejs/plugin-rsc/ssr";
import { use } from "react";
import { renderToReadableStream } from "react-dom/server.edge";
import { injectRSCPayload } from "rsc-html-stream/server";

import { RouterProvider } from "./client/router";
import type { RscPayload } from "./entry.rsc";
import { getNavigationDigest } from "./server/navigation";

/**
 * Renders the RSC stream to HTML and injects the RSC payload into the HTML, so the browser can hydrate without an additional request.
 *
 * Rejects if the shell can't be rendered, e.g. because a server component called notFound() or redirect(). The caller (entry.rsc.tsx)
 * handles those errors.
 */
export async function renderHtml(rscStream: ReadableStream<Uint8Array>): Promise<ReadableStream<Uint8Array>> {
    const [rscStreamForSsr, rscStreamForBrowser] = rscStream.tee();

    let payload: Promise<RscPayload> | undefined;
    function SsrRoot() {
        // Deserialization needs to be started inside the React DOM server render for preloading/preinit of client assets to work
        payload ??= createFromReadableStream<RscPayload>(rscStreamForSsr);
        const { root, pathname, search } = use(payload);
        return (
            <RouterProvider pathname={pathname} search={search}>
                {root}
            </RouterProvider>
        );
    }

    try {
        const htmlStream = await renderToReadableStream(<SsrRoot />, {
            bootstrapScriptContent: `import(${JSON.stringify(getClientEntryUrl())})`,
            onError(error: unknown) {
                if (!getNavigationDigest(error)) {
                    console.error(error);
                }
            },
        });
        return htmlStream.pipeThrough(injectRSCPayload(rscStreamForBrowser));
    } catch (error) {
        await rscStreamForBrowser.cancel();
        throw error;
    }
}
