#!/usr/bin/env bash

echo "[1/3] Stop site if running..."
npx dev-pm stop site
echo ""

echo "[2/3] Build site..."
cd site
rm -f .env .env.local .env.secrets .env.site-configs
rm -rf .next
NODE_ENV=production ADMIN_URL=http://localhost:8000 npx next build
ln -sf ../.env ./
ln -sf ../.env.local ./
ln -sf ../.env.secrets ./
ln -sf ../.env.site-configs ./
echo ""

echo "[3/3] Start site..."
NODE_ENV=production SITE_PREVIEW_SECRET=local npx dotenv -e .env.site-configs -- node server.js
