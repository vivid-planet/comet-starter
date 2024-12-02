# Execute this script via `npm run build-and-run-site`
#
# This script builds the site like in the CI and starts it. After cancelling the dev-server will 
# start again (if invoked via npm).
#
# Reasons why you want to do this:
# - Check if it builds without warnings
# - Check if there are suggestions from next build
# - Check if it behaves in the same way like the dev-server
# - Check caching behaviour, e.g. Cache-Control header (which is always no-cache in dev-server)

#!/usr/bin/env bash

echo "[1/3] Stop site if running..."
npx dev-pm stop site
echo ""

echo "[2/3] Build site..."
cd site
rm -f .env .env.local .env.secrets .env.site-configs
rm -rf .next
NODE_ENV=production npm run build
ln -sf ../.env ./
ln -sf ../.env.local ./
ln -sf ../.env.secrets ./
ln -sf ../.env.site-configs ./
echo ""

echo "[3/3] Start site..."
npx dotenv -e .env.secrets -e .env.site-configs -- npm run serve
