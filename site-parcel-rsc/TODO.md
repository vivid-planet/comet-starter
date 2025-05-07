TODO done:
- page.tsx: not-found, redirect
- Layout
- robots.txt
- language am html tag
- styled-components rehydration issue
- predefinedPage und übersetzte pfade für zB /news
- cache headers
- cache header für loader daten vgl. RSC request (der per fetch gemacht wird)

TODO:
- site-preview
- block-preview
- sitemap.xml, baseUrl berücksichtigen
- cache headers nicht in site-preview
- fetch cache, mit redis option (nicht in site-preview)
- aktiven menüpunkt stylen
- seo tags, incl. title u. description
- visibility param (bei gql requests mitschicken)
- 404 seite mit content und mehrsprachigkeit
- 404 wenn siteConfig nicht matched
- 404 wenn /assets/ nicht matched
- @comet eslint verwenden
- Link Document: redirect/404
- InternalLinkBlockProps <Link> verwenden
- PageLink active status
- beispiel für api route
- h3 statt express (evntl. nitro)
- alle responses gezip? html, assets, svg?
middlewares:
- admin redirect
- csp header
- dam rewrite
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
