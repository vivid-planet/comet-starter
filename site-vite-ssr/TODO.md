TODO done:
- styled-components rehydration issue
- StyledComponentsRegistry aufräumen
- page.tsx: not-found, redirect
- Layout
- site-preview
- block-preview
- cache headers (nicht in site-preview)
- cache header für loader daten vgl. RSC request (der per fetch gemacht wird)
- tailwind entfernen (war (natürlich) nie da)

TODO:
- sitemap.xml, baseUrl berücksichtigen
- robots.txt
- ganzes html im react rendern, incl html tag? (für language)
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
- predefinedPage und übersetzte pfade für zB /news
- beispiel für api route
- alle responses gezip? html, assets, svg?
middlewares:
- admin redirect
- csp header
- dam rewrite
- redirect to main host
- status
- cdn origin check (bei next im server)


vite-ssr:
- basierend auf create-vite-app mit react-ssr
- alles manuell: loader, router


vite-ssr pain points:
- styled-components zum laufen bringen (war hier noch am einfachsten, weil kein react streaming)
- kein rsc: nur ein loader auf route ebene
- keine out-of-the-box unterstüzung für:
  - rewrite (zB /dam rewrite)
  - sitemap.xml

vite-ssr derzeitige implementierung verbesserbar:
- express: ist das überhaupt noch zeitgemäß? (hono, h3, etc...)
- express: nur die server.ts sollte express verwenden, die routen besser irgendwas abstrakteres
- apiRouter läuft über entry.server.tsx, das ist nicht ideal. warum ist für die server sachen überhaupt vite im spiel?
- streaming unterstützen (wirklich nothwendig? wegen CDN eigentlich eh sinnlos)
- in entry-server.tsx, wo wir doch ein paar routen haben, könnte eine route-matching library eingesetzt werden
- ist es wirklich gut 404/redirect per expection zu lösen?

vite-ssr framework top:
- maximale flexibilität, keine workarounds nötig
