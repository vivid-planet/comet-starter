TODO done:
- styled-components (rehydration, ssr styles)
- page.tsx: not-found, redirect
- Layout

TODO:
- site-preview
- block-preview
- robots.txt
- sitemap.xml, baseUrl berücksichtigen
- cache headers für html seiten (nicht in site-preview)
- können env vars (ähnlichw ie NEXT_PUBLIC_ prefix) pro deployment geändert sein?
- cache header für loader daten vgl. RSC request (der per fetch gemacht wird)
- html cache header nicht setzen bei dynamischen pages (falls es sowas geben sollte)
- aktiven menüpunkt stylen
- fetch cache, mit redis option (nicht in site-preview)
- seo tags, incl. title u. description
- language am html tag
- 404 seite mit content und mehrsprachigkeit
- 404 wenn siteConfig nicht matched
- 404 wenn /assets/ nicht matched
- @comet eslint verwenden
- Link Document: redirect/404
- InternalLinkBlockProps <Link> verwenden
- PageLink active status
- tailwind entfernen
- predefinedPage und übersetzte pfade für zB /news
- beispiel für api route
- alles in @src? (pages)
- alle responses gezip? html, assets, svg?
- dev-server restart/reload bei middleware/handler änderungen
middlewares:
- admin redirect
- csp header
- dam rewrite
- redirect to main host
- status
- cdn origin check (bei next im server)



stanstack-start pain points:
- Beta
- Docs nicht so vollständig, verweist oft auf TanStack Router - was stark verwendet wird - aber halt dann in manchen details doch was anderes ist
- styled-components: keine fertige lösung/example - mit streaming ist das kompliziert

- loader ist isomorphic (wird am server und am client ausgeführt), muss daher eine "server function" aufrufen

stanstack-start top:
- alles perfekt typ sicher, sogar links (bringt uns aber so gut wie nichts da wir fast alles über eine wildcard machen)
- Server Functions: ähnlich wie die von react aber in den router integiert. auch von TRPC inspiriert
- file based routing oder code based (ähnlich wie remix)
