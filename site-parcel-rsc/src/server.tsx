import express from 'express';
import { callAction, renderRSC } from '@parcel/rsc/node';

// Page components. These must have "use server-entry" so they are treated as code splitting entry points.
import { Page } from './routes/Page';
import { NotFound } from './routes/NotFound';
import { getSiteConfigForRequest } from './util/siteConfig';
import { ComponentType, ReactNode } from 'react';
import { renderRequest, renderRequestHTML } from './util/rsc';
import { NotFoundError, RedirectError } from './util/rscErrors';
import { fetchPredefinedPages } from './util/predefinedPages';
import { NewsIndexPage } from './routes/news/NewsIndexPage';
import { NewsDetailPage } from './routes/news/[slug]/NewsDetailPage';

const app = express();

app.use(express.static('dist'));
app.use(express.static('public'));

app.use(async function(req, res, next) {
  const siteConfig = await getSiteConfigForRequest(req);
  if (!siteConfig) throw new Error("Site Config not found");
  res.locals.siteConfig = siteConfig;
  next();
});

app.use(async (req, res, next) => {
  if (req.url.startsWith('/.rsc/')) {
    res.locals.isRSC = true;
    req.url = req.url.replace('/.rsc/', '/');
  }
  next();
});

app.get("/", async (req, res) => {
  return res.redirect("/en/");
});

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

  renderRequest(req, res, <NewsIndexPage domain={siteConfig.scope.domain} language={language}/>, {
    component: NewsIndexPage as ComponentType
  });
});
app.get('/:language/news/:slug', async (req, res) => {
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;

  renderRequest(req, res, <NewsDetailPage slug={req.params.slug} domain={siteConfig.scope.domain} language={language}/>, {
    component: NewsDetailPage as ComponentType
  });
});

app.get('/:language/:path(*)?', async (req, res) => {
  
  const path = "/" + (req.params.path || "");
  const language = req.params.language;
  const siteConfig = res.locals.siteConfig;

  renderRequest(req, res, <Page path={path} domain={siteConfig.scope.domain} language={language}/>, {
    component: Page as ComponentType
  });
});

app.listen(3000);
console.log('Server listening on port 3000');
