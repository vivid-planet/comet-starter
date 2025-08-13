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

echo -e "\033[34m\nInstalling dependencies for root package\033[0m"
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

echo -e "\033[34m\nInstalling dependencies for admin\033[0m"
npm --prefix admin install
echo -e "\033[34m\nInstalling dependencies for api\033[0m"
npm --prefix api install
echo -e "\033[34m\nInstalling dependencies for site\033[0m"
npm --prefix site install
echo -e "\033[34m\nInstalling dependencies for create-app\033[0m"
npm --prefix create-app install

mkdir -p ./api/uploads

rm admin/node_modules/@mui/material/esm/Typography/Typography.js
cp debug/MuiTypography.js admin/node_modules/@mui/material/esm/Typography/Typography.js

rm admin/node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js
cp debug/DefaultPropsProvider.js admin/node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js
