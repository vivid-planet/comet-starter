import fs from 'node:fs/promises';
import express from 'express';
import { ViteDevServer } from 'vite';
import * as compression from "compression";

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite: ViteDevServer;
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)

  const apiRouter = (await vite.ssrLoadModule('/src/entry-server.tsx')).apiRouter
  app.use(apiRouter);
} else {
  const sirv = (await import('sirv')).default
  app.use((compression as any).default())
  app.use(base, sirv('./dist/client', { extensions: [] }))

  const apiRouter = (await import('./dist/server/entry-server.js')).apiRouter
  app.use(apiRouter);
}

// Serve pagedata
app.use("/.routedata/", async (req, res) => {
  let loader
  if (!isProduction) {
    loader = (await vite.ssrLoadModule('/src/entry-server.tsx')).loader
  } else {
    loader = (await import('./dist/server/entry-server.js')).loader
  }
  const data = await loader(req, res);
  res.status(200).json(data);
});


// Serve HTML
app.use("/", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    /** @type {import('./src/entry-server.ts').render} */
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render;
    }


    try {
      const rendered = await render(req, res);
      const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace(`<!--styles-->`, rendered.styles ?? '')
      .replace(`COMET_ROUTE_DATA = undefined`, `COMET_ROUTE_DATA = ` + JSON.stringify(rendered.routeData))

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)

    } catch (e) {
      if (e instanceof Response) {
        res.status(e.status);
        e.headers.forEach((value, key) => {
          res.setHeader(key, value);
        });
        //TODO handle body (if any)
        //TODO render 404 page
        res.end();
        return;
      } else {
        throw e;
      }
    }

  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
