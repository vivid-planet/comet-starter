import { createServer, type ServerResponse } from "node:http";
import { join } from "node:path";

import { createRequestListener } from "@remix-run/node-fetch-server";
import sirv from "sirv";

const host = process.env.SERVER_HOST ?? "localhost";
const port = parseInt(process.env.SITE_PORT || "3000", 10);
const cdnOriginCheckSecret = process.env.CDN_ORIGIN_CHECK_SECRET;

if (process.env.TRACING_ENABLED === "1") {
    // Must be loaded before the request handler to instrument fetch/http
    await import("./tracing.js");
}

// Built by `vite build` (see src/framework/entry.rsc.tsx)
const { default: rscEntry } = (await import(join(import.meta.dirname, "rsc/index.js"))) as {
    default: { fetch: (request: Request) => Promise<Response> };
};

function setStaticCacheHeaders(res: ServerResponse, pathname: string) {
    if (pathname.startsWith("/_assets/")) {
        // Built by Vite, file names contain a content hash
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (pathname.startsWith("/assets/")) {
        // assets in public/assets/* are cached for 1 week. When updated without changing the filename, the cache is not invalidated.
        // To force an immediate update of a file, ensure the filename is changed as well
        res.setHeader("Cache-Control", "public, max-age=604800");
    } else {
        res.setHeader("Cache-Control", "public, max-age=900"); // 15 minutes cache
    }
}

// Serves the client build and files from public/ (copied to dist/client by Vite)
const serveStatic = sirv(join(import.meta.dirname, "client"), {
    etag: true,
    setHeaders: setStaticCacheHeaders,
});

const handleRequest = createRequestListener((request) => rscEntry.fetch(request));

createServer((req, res) => {
    if (cdnOriginCheckSecret && req.headers["x-cdn-origin-check"] !== cdnOriginCheckSecret) {
        res.statusCode = 403;
        res.end();
        return;
    }

    serveStatic(req, res, () => handleRequest(req, res));
})
    .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(port, host, () => {
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://${host}:${port}`);
    });
