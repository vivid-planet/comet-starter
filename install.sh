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
npm install --strict-peer-deps

echo -e "\033[34m\nSetup project files\033[0m"
npm run setup-project-files

# Lang install
sh ./site/intl-update.sh
sh ./admin/intl-update.sh
npm run create-site-configs-env

echo -e "\033[34m\nInstalling dependencies for admin\033[0m"
npm --prefix admin install --strict-peer-deps
echo -e "\033[34m\nInstalling dependencies for api\033[0m"
npm --prefix api install --strict-peer-deps
echo -e "\033[34m\nInstalling dependencies for site\033[0m"
npm --prefix site install --strict-peer-deps
echo -e "\033[34m\nInstalling dependencies for create-app\033[0m"
npm --prefix create-app install --strict-peer-deps

mkdir -p ./api/uploads
