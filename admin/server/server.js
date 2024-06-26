/* eslint-disable no-undef */
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const fs = require("fs");

const app = express();
const port = process.env.APP_PORT ?? 3000;

// Read index.html file
let indexFile = fs.readFileSync("../build/index.html", "utf8");

// Replace environment variables
indexFile = indexFile.replace(/\$([A-Z_]+)/g, (match, p1) => {
    return process.env[p1] || "";
});

app.use(compression());

app.disable("x-powered-by");

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'none'"],
                "script-src-elem": ["'unsafe-inline'", "'self'"],
                "style-src-elem": ["'unsafe-inline'", "'self'"],
                "style-src-attr": ["'unsafe-inline'"],
                "font-src": ["'self'", "data:"],
                "connect-src": ["https:"],
                "img-src": ["'self'", "data:", "https:"],
                "frame-src": ["https:"],
                upgradeInsecureRequests: [],
            },
            upgradeInsecureRequests: true,
            useDefaults: false,
        },
        xXssProtection: false,
        xFrameOptions: false,
        crossOriginResourcePolicy: "same-origin",
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: true,
        strictTransportSecurity: {
            maxAge: 63072000,
            includeSubDomains: true,
            preload: true,
        },
        referrerPolicy: {
            policy: "no-referrer",
        },
        xContentTypeOptions: true,
        xDnsPrefetchControl: false,
        xDownloadOptions: true,
        xPermittedCrossDomainPolicies: true,
    }),
);

app.get("/status/health", (req, res) => {
    res.send("OK!");
});

app.use(
    express.static("../build", {
        index: false, // Don't send index.html for requests to "/" as it will be handled by the fallback route (with replaced environment variables)
        setHeaders: (res, path, stat) => {
            if (path.endsWith(".js")) {
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
    // Don't cache the index.html at all to make sure applications updates are applied
    // implemented as suggested by https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#preventing_storing
    res.setHeader("cache-control", "no-store");
    res.send(indexFile);
});

app.listen(port, () => {
    console.log(`Admin app listening at http://localhost:${port}`);
});
