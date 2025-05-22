import { renderHTML as renderHTMLBase, renderRSC } from '@parcel/rsc/node';
import { renderDevError, RSCToHTMLOptions } from '@parcel/rsc/server';
import type { IncomingMessage, ServerResponse } from 'http';
import type { ReadableStream as NodeReadableStream } from 'stream/web';
import { Readable } from 'stream';
import { ReactNode } from 'react';
import { NotFound } from '@src/routes/NotFound';
import { NotFoundError, RedirectError } from './rscErrors';
import { Request, Response } from 'express';
import { InitialUrlContext, InitialUrlProvider } from './usePathname';


export async function renderDevError2(error: Error, options: RSCToHTMLOptions): Promise<Readable | string> {
  if (process.env.NODE_ENV !== 'production') {
    let content = (
      <html>
        <meta charSet="utf-8" />
        <title>Error</title>
        <body>
            <h1>Error: {error.message}</h1>
            <pre>{error.stack}</pre>
        </body>
      </html>
    );

    // Load bootstrap script containing error overlay, and re-throw server error on the client.
    let bootstrapScript = (options?.component as any)?.bootstrapScript;
    bootstrapScript += '.then(() => {';
    bootstrapScript += `let err = new Error(${JSON.stringify(error.message)});`;
    bootstrapScript += `err.stack = ${JSON.stringify(error.stack)};`;
    bootstrapScript += 'throw err;';
    bootstrapScript += '})';

    return await renderHTMLBase(content, {
      ...options,
      component: {
        bootstrapScript
      } as any
    });
  } else {
    return '<h1>Something went wrong!</h1>';
  }
}

const temporaryReferencesSymbol = Symbol.for('temporaryReferences');

export interface RenderRequestHTMLOptions extends RSCToHTMLOptions {
  renderError?: (err: Error) => ReactNode
}
export async function renderRequestHTML(request: IncomingMessage, response: ServerResponse, root: any, options?: RenderRequestHTMLOptions): Promise<void> {
  options = {
    ...options,
    temporaryReferences: options?.temporaryReferences ?? (request as any)[temporaryReferencesSymbol]
  };
    try {
      let html = await renderHTMLBase(root, options);
      response.setHeader('Content-Type', 'text/html');
      html.pipe(response);
    } catch (err) {
      response.statusCode = 500;
      let error = err instanceof Error ? err : new Error(String(err));
      let renderedError;
      try {
        renderedError = options?.renderError 
          ? await renderHTMLBase(options.renderError(error), options)
          : await renderDevError2(error, options);
      } catch {
        renderedError = '<h1>Something went wrong!</h1>';
      }
      if (typeof renderedError === 'string') {
        response.end(renderedError);
      } else {
        renderedError.pipe(response);
      }
    }
}

export async function renderRequest(req: Request, res: Response, root: any, options?: RenderRequestHTMLOptions): Promise<void> {
  const siteConfig = res.locals.siteConfig;
  const language = res.locals.language;
  if (res.locals.isRSC) {    
    const html = await renderRSC(<InitialUrlProvider value={req.url}>{root}</InitialUrlProvider>);
    res.setHeader('Content-Type', 'text/x-component');
    html.pipe(res);
    if (res.statusCode === 200 && !res.locals.preview) {
      res.setHeader("Cache-Control", "max-age=450, s-maxage=450, stale-while-revalidate"); // TODO not always?
    }
} else {
    await renderRequestHTML(req, res, <InitialUrlProvider value={req.url}>{root}</InitialUrlProvider>, {
      ...options,
      renderError: (error) => {
        if (error.message === 'NotFound') {
          res.status(404);
          return <NotFound scope={{ domain: siteConfig.scope.domain, language }} />;
        } else if (error.message === 'Redirect') {
          if (!("target" in error)) throw new Error("Redirect target is undefined");
          res.redirect(302, error.target as string);
        } else {
          res.status(500);
          return (
            <html>
              <meta charSet="utf-8" />
              <title>Error</title>
              <body>
                  <h1>Error: {error.message}</h1>
                  <pre>{error.stack}</pre>
              </body>
            </html>
          );  
        }
      }
    });
    if (res.statusCode === 200 && !res.locals.preview) {
      res.setHeader("Cache-Control", "max-age=450, s-maxage=450, stale-while-revalidate"); // TODO not always?
    }  
}
}