import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Request, type Response as ExpressResponse } from 'express';
import { ServerStyleSheet } from 'styled-components';
import { fetchPredefinedPages } from './routes/util/predefinedPages';
import { getSiteConfigForRequest } from './util/siteConfig';
import { RouterContext } from './browserRouter/RouterProvider';
export { apiRouter } from "./apiRoutes";
import { match } from "path-to-regexp";
import { Layout, loader as layoutLoader } from "@src/layout/Layout";
import { previewParams } from './util/sitePreview';
import { buildEntryRoutes } from './routes/entryRoutes';


export async function loader(request: Request, response: ExpressResponse) {

  const siteConfig = await getSiteConfigForRequest(request);
  if (!siteConfig) throw new Error("SiteConfig not found");

  if (!layoutLoader) throw new Error(); //nullable due to serverOnly$, but always defined in loader (runs on server)

  const routes = buildEntryRoutes(await fetchPredefinedPages(siteConfig.scope.domain));
  for (let routeIndex=0; routeIndex < routes.length; routeIndex++) {
      const route = routes[routeIndex];
      const matchResult = match(route.path)(request.url); //TODO this re-creates the regex every time, should be memoized for better performance
      if (matchResult) {
          Object.keys(matchResult.params).forEach((key) => {
              let value = matchResult.params[key];
              if (Array.isArray(value)) {
                value = "/"+value.join("/");
              }
              if (value) {
                  request.params[key] = value;
              }
          });
          if (route.language) {
            request.params.language = route.language;
          }
          return {
              routeIndex,
              routeLoaderData: await route.loader?.(request, response),
              layoutLoaderData: await layoutLoader(request)
          };
      }
  }

  //TODO query for redirect
  throw new Response(null, { status: 404 }); //TODO Response vs express.Response


}

export async function render(request: Request, response: ExpressResponse) {
  const siteConfig = await getSiteConfigForRequest(request);
  if (!siteConfig) throw new Error("SiteConfig not found");
  const preview = await previewParams(request);

  const predefinedPages = await fetchPredefinedPages(siteConfig.scope.domain);
  const routes = buildEntryRoutes(predefinedPages); //not ideal to call buildEntryRoutes here and in loader. the loader could be simply moved into render, no need for a separate fn (but then .routedata/ needs also be handled in here. nut really a problem though)
  const entryData = {
    ...await loader(request, response),
    predefinedPages,
  };
  
  const EntryComponent = routes[entryData.routeIndex].component;
  if (!EntryComponent) throw new Error("Component not set for this route");


  const sheet = new ServerStyleSheet();

  const router = {
    push: (to: string) => {
      //noop on server side
    },
    routeData: {
      predefinedPages: await fetchPredefinedPages(siteConfig.scope.domain),
    }
  };

    const html = renderToString(
      sheet.collectStyles(
        <StrictMode>
          <RouterContext.Provider value={router}>
            <Layout loaderData={entryData.layoutLoaderData}>
              <EntryComponent loaderData={entryData.routeLoaderData} />
            </Layout>
          </RouterContext.Provider>
        </StrictMode>
      ),
    );



    if (!preview) {
      // TODO not all routes are cacheable
      response.setHeader("Cache-Control", "max-age=450, s-maxage=450, stale-while-revalidate");
    }

    return { html, routeData: entryData, styles: sheet.getStyleTags() };
}
