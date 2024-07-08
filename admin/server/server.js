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

app.disable("x-powered-by"); // Disable the X-Powered-By header as it is not needed and can be used to infer the server technology

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
                "frame-ancestors": ["'self'"],
                upgradeInsecureRequests: [],
            },
            useDefaults: false, // Avoid default values for not explicitly set directives
        },
        xFrameOptions: false, // Disable deprecated header
        crossOriginResourcePolicy: "same-origin", // Do not allow cross-origin requests to access the response
        crossOriginEmbedderPolicy: false, // value=no-corp
        crossOriginOpenerPolicy: true, // value=same-origin
        strictTransportSecurity: {
            // Enable HSTS
            maxAge: 63072000, // 2 years (recommended when subdomains are included)
            includeSubDomains: true,
            preload: true,
        },
        referrerPolicy: {
            policy: "no-referrer", // No referrer information needs to be sent
        },
        xContentTypeOptions: true, // value=nosniff
        xDnsPrefetchControl: false, // Disable non-standard header as recommended by MDN
        xPermittedCrossDomainPolicies: true, // value=none (prevent MIME sniffing)
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
