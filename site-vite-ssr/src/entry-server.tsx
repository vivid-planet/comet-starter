import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Request, type Response as ExpressResponse } from 'express';
import { ServerStyleSheet } from 'styled-components';
import { routes } from "./routes";
export { apiRouter } from "./apiRoutes";
export { loader as pageLoader } from "./routes/page";


export async function loader(request: Request, response: ExpressResponse) {
  let route;
  if (request.url.startsWith("/block-preview/")) {
    const m = request.url.match(/^\/block-preview\/([^/]*)\/([^/]*)\/([^/]*)$/); //TODO use some url matching library, and move pattern into route file itself
    if (!m) throw new Response(null, { status: 404 });
    const [, domain, language, type] = m;
    request.params = { domain, language, type };
    route = "blockPreview";
  } else if (request.url == "/") {
    throw new Response(null, { status: 302, headers: { Location: "/en" } });
  } else {
    const m = request.url.match(/\/([a-z]+)(\/.*)?/); //match language
    if (!m) throw new Response(null, { status: 404 });
    request.params = { language: m[1], "*": m[2] };
    route = "page";
  }
  const routeLoader = routes[route].loader;
  return {
    data: routeLoader ? await routeLoader(request, response) : undefined,
    route
  };
}

export async function render(request: Request, response: ExpressResponse) {

  const routeData = await loader(request, response);
  
  const RouteComponent = routes[routeData.route].component;

  const sheet = new ServerStyleSheet();

   const html = renderToString(
    sheet.collectStyles(
      <StrictMode>
        <RouteComponent loaderData={routeData.data} />
      </StrictMode>
    ),
  )
  return { html, routeData, styles: sheet.getStyleTags() };
}
