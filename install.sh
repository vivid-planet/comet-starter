#!/usr/bin/env bash
set -e

. ~/.nvm/nvm.sh

# jump into project dir
cd $(dirname $0)

if [[ ! -f .env.local ]]
then
    echo "# override for local env" > .env.local
fi

# use correct Node version and install dependencies
nvm install
nvm use

echo -e "\033[34m\nInstalling dependencies for root package\033[0m"
pnpm install

echo -e "\033[34m\nSetup project files\033[0m"
pnpm run setup-project-files

# Install agent skills
pnpm run install-agent-skills

# Lang install
sh ./site/intl-update.sh
sh ./admin/intl-update.sh
pnpm run create-site-configs-env

echo -e "\033[34m\nInstalling dependencies for admin\033[0m"
pnpm --dir admin install
echo -e "\033[34m\nInstalling dependencies for api\033[0m"
pnpm --dir api install
echo -e "\033[34m\nInstalling dependencies for site\033[0m"
pnpm --dir site install
echo -e "\033[34m\nInstalling dependencies for create-app\033[0m"
pnpm --dir create-app install

mkdir -p ./api/uploads

pnpm run setup:download-oauth2-proxy
