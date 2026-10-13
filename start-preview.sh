#!/usr/bin/env bash
set -e

# Starts this project as a preview environment: renders the site configs for the preview host and
# brings the compose project up. Everything project specific happens here, so that a preview
# controller only has to run this script and gets a running compose project.
#
# Configured through the environment, all optional:
#
#   COMPOSE_PROJECT_NAME  compose project to create (default dextinity-preview)
#   PREVIEW_PORT          host port the environment is published on (default 8080)
#   PREVIEW_BASE_DOMAIN   base domain (default preview.localhost), also accepted as PREVIEW_DOMAIN
#   PREVIEW_HOST          public host incl. port (default <PREVIEW_BASE_DOMAIN>:<PREVIEW_PORT>)
#   PREVIEW_SCHEME        http or https (default http)
#   PREVIEW_URLS          file to report the urls of this preview to, one "<name>=<url>" per line
#
# Without any of them it starts the preview environment on http://preview.localhost:8080.
#
# Everything besides the main site lives one label next to the base domain and not below it -
# admin--<host> and secondary--<host>, not admin.<host> - so that one wildcard certificate covers it.

cd "$(dirname "$0")"

# A preview controller hands the base domain over as PREVIEW_DOMAIN, but in this project that name
# belongs to the domain that serves the site in Dextinity's preview mode - so it only goes into the
# host here and none of the containers gets it. See .docker-preview/README.md.
PREVIEW_BASE_DOMAIN="${PREVIEW_BASE_DOMAIN:-${PREVIEW_DOMAIN:-preview.localhost}}"
export PREVIEW_PORT="${PREVIEW_PORT:-8080}"
export PREVIEW_SCHEME="${PREVIEW_SCHEME:-http}"
export PREVIEW_HOST="${PREVIEW_HOST:-$PREVIEW_BASE_DOMAIN:$PREVIEW_PORT}"
# The auth proxy may only send its session cookie over https when the preview is served over https.
export PREVIEW_COOKIE_SECURE="${PREVIEW_COOKIE_SECURE:-$([[ $PREVIEW_SCHEME == https ]] && echo true || echo false)}"

if [[ -s "$HOME/.nvm/nvm.sh" ]]
then
    . "$HOME/.nvm/nvm.sh"
    nvm install
fi

# The images do not know the preview host: the site configs are rendered for it here and injected
# into api, admin and site by the compose file. Rendering needs the root package installed.
# npm ci and not npm install, so that running the preview never rewrites package-lock.json.
[[ -x ./node_modules/.bin/dextinity ]] || npm ci --no-audit --no-fund
SITE_DOMAIN="$PREVIEW_HOST" ./node_modules/.bin/dextinity inject-site-configs \
    -f site-configs/site-configs.ts \
    -i .env.site-configs.tpl \
    -o .env.site-configs.preview \
    --base64

# --project-directory keeps the repository root the base of the build contexts and of the .env
# files, although the compose file itself lives in .docker-preview/.
docker compose -p "${COMPOSE_PROJECT_NAME:-dextinity-preview}" -f .docker-preview/docker-compose.yml \
    --project-directory . up --build -d --wait

# Tell the caller which domains this project serves, so it can link to them.
if [[ -n "${PREVIEW_URLS:-}" ]]
then
    cat > "$PREVIEW_URLS" <<URLS
Site=$PREVIEW_SCHEME://$PREVIEW_HOST
Admin=$PREVIEW_SCHEME://admin--$PREVIEW_HOST
URLS
fi
