Astro pain points:
- *.astro: keine echte typescript datei
   - gibt natürlich extension für vscode
   - eslint/prettier funktionieren nicht out of the box
- Kein React: kein styled-components, kein theme, kein react-intl
    - mögliche lösung: css modules + sass
    - intl??
- client-side react in islands
    - astro component nicht in react möglich
    - jede island macht ihren eigenen react root: ein normaler react context provider über die app ist nicht möglich
      - kein ThemeProvider, kein IntlProvider möglich (muss für jede island extra gemacht werden)
      - shared state muss mit eigenen techniken gemacht werden
    - Grenze zwischen React & Astro components schwierig zu treffen
- nur file-based routing

Astro so-lala:
- kein rewrite (wie next) auf externen service möglich, geht aber per middleware oder endpoint (aka api route) plus fetch
- predefined-pages rewrite genau so möglich wie in next (middleware)
- mehrere middleware auch nicht möglich (wie in next)

Astro top:
- sehr gute docs
- jede astro component kann daten laden (nicht nur page)
- kein client side javascript out of the box (auch nicht für react components); sobald aber eine island braucht es react (in der praxis wird immer react geladen, wenn zB ein header react braucht)

