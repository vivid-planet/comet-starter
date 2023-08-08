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

# create admin symlinks
ln -sf ../.env ./admin/
ln -sf ../.env.local ./admin/
ln -sf ../.env.secrets ./admin/
ln -sf ../api/schema.gql ./admin/
ln -sf ../api/block-meta.json ./admin/
ln -sf ../api/src/comet-config.json ./admin/

# create site symlinks
ln -sf ../.env ./site/
ln -sf ../.env.local ./site/
ln -sf ../.env.secrets ./site/
ln -sf ../api/schema.gql ./site/
ln -sf ../api/block-meta.json ./site/
ln -sf ../api/src/comet-config.json ./site/

# Lang install
sh ./intl-update.sh

npm --prefix admin install &
npm --prefix api install &
npm --prefix site install &
wait

mkdir -p ./api/uploads
