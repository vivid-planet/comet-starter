TODO done:
- styled-components rehydration issue
- StyledComponentsRegistry aufräumen
- page.tsx: not-found, redirect
- site-preview
- block-preview
- sitemap.xml, baseUrl berücksichtigen
- robots.txt
- Layout


TODO:
- cache headers (nicht in site-preview)
- cache header für loader daten vgl. RSC request (der per fetch gemacht wird)
- fetch cache, mit redis option (nicht in site-preview)
- aktiven menüpunkt stylen
- seo tags, incl. title u. description
- language am html tag
- 404 seite mit content und mehrsprachigkeit
- 404 wenn siteConfig nicht matched
- können env vars (ähnlichw ie NEXT_PUBLIC_ prefix) pro deployment geändert sein?
- 404 wenn /assets/ nicht matched
- @comet eslint verwenden
- Link Document: redirect/404
- InternalLinkBlockProps <Link> verwenden
- PageLink active status
- tailwind entfernen
- predefinedPage und übersetzte pfade für zB /news
- beispiel für api route
- @app -> @src
- alle responses gezip? html, assets, svg?
middlewares:
- admin redirect
- csp header
- dam rewrite
- redirect to main host
- status
- cdn origin check (bei next im server)


implementierungen
- react-router v7
- vike
- astro
- tanstack start
- meteor?
- vinxi?
- manuell: https://dev.to/yugjadvani/mastering-server-side-rendering-ssr-in-react-19-with-vite-the-ultimate-guide-for-developers-4mgm
- waku (disqualifiziert)

waku pain points:
- 404 seite aus RSC nicht möglich, redirekt kompliziert


react-router framework pain points:
- docs; vor allem dass mit "react-router" meist react-router-dom (client side router) gemeint ist
- styled-components zum laufen bringen
- kein rsc: nur ein loader auf route ebene
- man muss sich eigene library für sitemap.xml suchen
- rewrite auf externe api (/dam rewrite) wird nicht direkt unterstützt, custom server mit proxy ist notwendig

react-router framework top:
- routen haben generierte typen mit params u.a. (auch wenn wir das nicht wirklich brauchen)
- routen konfiguration per code oder filesystem
