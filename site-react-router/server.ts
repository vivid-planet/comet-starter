import { predefinedPagesMiddleware } from "@app/middleware/predefinedPages.js";
import { createRequestHandler } from "@react-router/express";
//import compression from "compression";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const reactRouterHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule("virtual:react-router/server-build")
    : await import("./build/server/index.js"),
});

const app = express();

//app.use(compression());
app.disable("x-powered-by");

if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

app.use(express.static("build/client", { maxAge: "1h" }));

app.use('/dam/', createProxyMiddleware({
  target: process.env.API_URL_INTERNAL+"/dam/",
  changeOrigin: true,
}));

app.use(predefinedPagesMiddleware);

app.all("*", reactRouterHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);
