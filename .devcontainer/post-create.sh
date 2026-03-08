#!/usr/bin/env bash
set -e

cd /workspace

# Create .env.local with devcontainer overrides
cat > .env.local <<'EOF'
POSTGRESQL_HOST=postgres
IMGPROXY_URL=http://imgproxy:8080
JAEGER_OLTP_PORT=4318
SERVER_HOST=0.0.0.0
DEV_DOMAIN=localhost
EOF

# Install root dependencies
echo -e "\033[34mInstalling root dependencies\033[0m"
npm install

# Setup project files
echo -e "\033[34mSetup project files\033[0m"
npm run setup-project-files

# Lang install
sh ./site/intl-update.sh
sh ./admin/intl-update.sh
npm run create-site-configs-env

# Install package dependencies
echo -e "\033[34mInstalling admin dependencies\033[0m"
npm --prefix admin install
echo -e "\033[34mInstalling api dependencies\033[0m"
npm --prefix api install
echo -e "\033[34mInstalling site dependencies\033[0m"
npm --prefix site install
echo -e "\033[34mInstalling create-app dependencies\033[0m"
npm --prefix create-app install

mkdir -p ./api/uploads

# Download oauth2-proxy
npm run setup:download-oauth2-proxy

# Run database migrations and load fixtures
echo -e "\033[34mRunning database migrations\033[0m"
npm --prefix api run db:migrate
echo -e "\033[34mLoading fixtures\033[0m"
npm --prefix api run fixtures
