import { createServer } from "http";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const cdnOriginCheckSecret = process.env.CDN_ORIGIN_CHECK_SECRET;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    if (process.env.TRACING_ENABLED) {
        require("./tracing");
    }
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const parsedUrl = parse(req.url!, true);

            if (cdnOriginCheckSecret) {
                if (req.headers["x-cdn-origin-check"] !== cdnOriginCheckSecret) {
                    res.statusCode = 403;
                    res.end();
                    return;
                }
            }

            const originalWriteHead = res.writeHead;
            res.writeHead = function (statusCode: number, ...args: unknown[]) {
                // since writeHead is a callback function, it's called after handle() -> we get the actual response statusCode
                if (statusCode >= 400) {
                    // prevent caching of error responses
                    res.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
                } else if (
                    parsedUrl.pathname?.startsWith("/assets/") ||
                    parsedUrl.pathname === "/favicon.ico" ||
                    parsedUrl.pathname === "/apple-icon.png" ||
                    parsedUrl.pathname === "/icon.svg" ||
                    parsedUrl.pathname === "/robots.txt" ||
                    parsedUrl.pathname === "/sitemap.xml"
                ) {
                    res.setHeader("Cache-Control", "public, max-age=900");
                }

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore -> TS complains about passing unknown[] to writeHead, however explicit typing is complicated because writeHead can be overloaded and has two signatures
                return originalWriteHead.apply(this, [statusCode, ...args]);
            };

            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    })
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`> Ready on http://localhost:${port}`);
        });
});
