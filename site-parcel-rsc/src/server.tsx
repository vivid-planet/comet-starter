import express, { Request } from 'express';
import { callAction, renderRSC } from '@parcel/rsc/node';

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { Page } from './routes/Page';
import { NotFound } from './routes/NotFound';
import { getSiteConfigForDomain, getSiteConfigForRequest } from './util/siteConfig';
import { ComponentType } from 'react';
import { renderRequest, renderRequestHTML } from './util/rsc';
import { fetchPredefinedPages } from './util/predefinedPages';
import { NewsIndexPage } from './routes/news/NewsIndexPage';
import { NewsDetailPage } from './routes/news/[slug]/NewsDetailPage';
import { verifySitePreviewJwt } from '@comet/cms-site';
import { SignJWT } from 'jose';
import { sitePreviewParamsStorage } from './util/sitePreview';
import cookieParser from 'cookie-parser';
import { BlockPreviewPage } from './routes/BlockPreviewPage';
import { sitemapXmlRoute } from './routes/sitemap.xml';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cookieParser());
app.use(express.static('dist'));
app.use(express.static('public'));

app.use('/dam/', createProxyMiddleware({
  target: process.env.API_URL_INTERNAL+"/dam/",
  changeOrigin: true,
}));

app.get("/site-preview", async (req: Request<{}, {}, {}, { jwt: string; }>, res) => {
  const jwt = req.query.jwt;
  if (!jwt) {
      res.status(400).send("JWT-Parameter is missing.");
      return;
  }

  const jwtData = await verifySitePreviewJwt(jwt);
  if (!jwtData) {
    res.status(400).send("JWT-validation failed.");
    return;
  }

  const cookieJwt = await new SignJWT({
      scope: jwtData.scope,
      path: jwtData.path,
      previewData: jwtData.previewData,
  })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1 day")
      .sign(new TextEncoder().encode(process.env.SITE_PREVIEW_SECRET));

  res.cookie('__comet_preview', cookieJwt, {
      httpOnly: true,
      sameSite: 'lax',
  });
  res.redirect(jwtData.path);

});

app.get("/block-preview/:domain/:language/:type", async (req, res) => {
  const { domain, language, type } = req.params;
  renderRequest(req, res, <BlockPreviewPage domain={domain} language={language} type={type} />, {
    component: BlockPreviewPage as ComponentType
  });
});


// middleware that resolves siteConfig and site-preview cookie
app.use(async function(req, res, next) {
  const siteConfig = await getSiteConfigForRequest(req);
  const previewCookie = req.cookies.__comet_preview;
  if (previewCookie || (!siteConfig && req.headers.host === process.env.PREVIEW_DOMAIN)) {
    if (!previewCookie) {
        res.status(400).send('__comet_preview cookie is missing.');
        return;
    }
    const preview = await verifySitePreviewJwt(previewCookie);
    if (!preview) {
      res.status(400).send('__comet_preview cookie is invalid.');
      return;
    }
    res.locals.preview = preview;
    res.locals.siteConfig = await getSiteConfigForDomain(preview.scope.domain);
    sitePreviewParamsStorage.run(preview, next);
  } else {
    if (!siteConfig) throw new Error("Site Config not found");
    res.locals.siteConfig = siteConfig;
    next();  
  }
});

app.use(async (req, res, next) => {
  if (req.url.startsWith('/.rsc/')) {
    res.locals.isRSC = true;
    req.url = req.url.replace('/.rsc/', '/');
  }
  next();
});


// predefined pages rewrite middleware
app.use(async (req, res, next) => {
  const siteConfig = res.locals.siteConfig;
  const predefinedPages = await fetchPredefinedPages(siteConfig.scope.domain);
  for (const page of predefinedPages) {
    if (req.url.startsWith(page.pageTreeNodePath)) {
      req.url = req.url.replace(page.pageTreeNodePath, page.codePath);
      next();
      return;
    }
  }
  next();
});


app.get("/robots.txt", async (req, res) => {
  const siteConfig = res.locals.siteConfig;
  const robotText = "User-agent: *\n"+
  "Allow: /\n"+
  "Sitemap: "+siteConfig.url +"/sitemap.xml\n";
  res.setHeader('Content-Type', 'text/plain');
  res.send(robotText);
});

app.get("/sitemap.xml", sitemapXmlRoute);

app.get("/", async (req, res) => {
  return res.redirect("/en/");
});

//middleware that parses (and validates) the language
app.use('/:language', async (req, res, next) => {
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;
  if (!siteConfig.scope.languages.includes(language)) {
      res.status(404).send('404 Not Found');
      return;
  }
  res.locals.language = language;
  next();
});

app.get('/:language/news', async (req, res) => {
    
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;

  renderRequest(req, res, <NewsIndexPage scope={{ domain: siteConfig.scope.domain, language}} siteConfig={siteConfig} />, {
    component: NewsIndexPage as ComponentType
  });
});
app.get('/:language/news/:slug', async (req, res) => {
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;

  renderRequest(req, res, <NewsDetailPage slug={req.params.slug} scope={{ domain: siteConfig.scope.domain, language}} siteConfig={siteConfig} />, {
    component: NewsDetailPage as ComponentType
  });
});

app.get('/:language/:path(*)?', async (req, res) => {
  
  const path = "/" + (req.params.path || "");
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;

  renderRequest(req, res, <Page path={path} siteConfig={siteConfig} scope={{ domain: siteConfig.scope.domain, language}} />, {
    component: Page as ComponentType
  });
});

app.listen(3000);
console.log('Server listening on port 3000');
