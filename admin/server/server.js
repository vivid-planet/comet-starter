/* eslint-disable no-undef */
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
const port = process.env.APP_PORT ?? 3000;

app.use(compression());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "'unsafe-inline'"],
                "img-src": ["'self'", "https:", "data:"],
                "default-src": ["'self'", "https:"],
                "media-src": ["'self'", "https:"],
                "style-src": ["'self'", "https:", "'unsafe-inline'"],
                "font-src": ["'self'", "https:", "data:"],
            },
        },
        xXssProtection: false,
        strictTransportSecurity: {
            maxAge: 63072000,
            includeSubDomains: true,
            preload: true,
        },
    }),
);

app.get("/status/health", (req, res) => {
    res.send("OK!");
});

app.use(
    express.static("../build", {
        setHeaders: (res, path, stat) => {
            if (path.endsWith(".html")) {
                // Don't cache the index.html at all to make sure applications updates are applied
                // implemented as suggested by https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#preventing_storing
                res.setHeader("cache-control", "no-store");
            } else if (path.endsWith(".js")) {
                // The js file is static and the index.html uses a parameter as cache buster
                // implemented as suggested by https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#caching_static_assets
                res.setHeader("cache-control", "public, max-age=31536000, immutable");
            } else {
                // Icons and Fonts could be changed over time, cache for 7d
                res.setHeader("cache-control", "public, max-age=604800, immutable");
            }
        },
    }),
);

// As a fallback, route everything to index.html
app.get("*", (req, res) => {
    res.sendFile(`index.html`, { root: `${__dirname}/../build/`, headers: { "cache-control": "no-store" } });
});

app.listen(port, () => {
    console.log(`Admin app listening at http://localhost:${port}`);
});
