#!/usr/bin/env bash
set -e

. ~/.nvm/nvm.sh

# jump into project dir
cd $(dirname $0)

if [[ ! -f .env.local ]]
then
    echo "# override for local env" > .env.local
fi

# use correct npm and install dependencies
nvm install
nvm use
npm install


# create api symlinks
ln -sf ../.env ./api/
ln -sf ../.env.local ./api/
ln -sf ../.env.secrets ./api/
ln -sf ../.env.site-configs ./api/
ln -sf ../../site-configs/site-configs.d.ts ./api/src/

# create admin symlinks
ln -sf ../.env ./admin/
ln -sf ../.env.local ./admin/
ln -sf ../.env.secrets ./admin/
ln -sf ../.env.site-configs ./admin/
ln -sf ../api/schema.gql ./admin/
ln -sf ../api/block-meta.json ./admin/
ln -sf ../../api/src/comet-config.json ./admin/src/
ln -sf ../../site-configs/site-configs.d.ts ./admin/src/

# create site symlinks
ln -sf ../.env ./site/
ln -sf ../.env.local ./site/
ln -sf ../.env.secrets ./site/
ln -sf ../.env.site-configs ./site/
ln -sf ../api/schema.gql ./site/
ln -sf ../api/block-meta.json ./site/
ln -sf ../../api/src/comet-config.json ./site/src/
ln -sf ../../site-configs/site-configs.d.ts ./site/src/

# Lang install
sh ./site/intl-update.sh
sh ./admin/intl-update.sh
npm run create-site-configs-env

npm --prefix admin install
npm --prefix api install
npm --prefix site install
npm --prefix create-app install

mkdir -p ./api/uploads
