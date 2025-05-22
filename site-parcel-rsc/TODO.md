TODO done:
- page.tsx: not-found, redirect
- Layout
- robots.txt
- language am html tag
- styled-components rehydration issue
- predefinedPage und übersetzte pfade für zB /news
- cache headers
- cache header für loader daten vgl. RSC request (der per fetch gemacht wird)
- site-preview
- block-preview
- seo tags, incl. title u. description
- sitemap.xml, baseUrl berücksichtigen
- cache headers nicht in site-preview
- visibility param (bei gql requests mitschicken)
- dam rewrite
- fetch cache, mit redis option (nicht in site-preview)
- aktiven menüpunkt stylen
- 404 seite mit content und mehrsprachigkeit
- Link Document: redirect/404

TODO:
- cache haders abhängig von page abschaltbar oder konfigurierbar
- 404 wenn siteConfig nicht matched
- 404 wenn /assets/ nicht matched
- schöne 404 seite wenn language nicht matched
- @comet eslint verwenden
- InternalLinkBlockProps <Link> verwenden
- PageLink active status
- beispiel für api route
- h3 statt express (evntl. nitro) oder hono
- alle responses gezip? html, assets, svg?
middlewares:
- admin redirect
- csp header
- redirect to main host
- status
- cdn origin check (bei next im server)
- styled-components server-side css

Source:
https://overreacted.io/impossible-components/

parcel-rsc pain points:
- noch nicht stable
- parcel, nicht vite (https://github.com/facebook/react/tree/main/packages (rect-server-dom-*); https://github.com/facebook/react/pull/31768; https://github.com/vitejs/vite/discussions/4591)

parcel-rsc top:
- rsc, sehr viel mit nextjs kompatibel
- standard express (oder was auch immer)
- kein client-side router
- <meta>/<title> wird direkt von react verwendet (nachteile?)
