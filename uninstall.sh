#!/usr/bin/env bash
. ~/.nvm/nvm.sh

# Run this script to restart development with a clean-dev-enviroment
#
# Also helps when: 
# - started "npm run dev" within the wrong node version and packages are broken
# - you need to change a migration that has already run locally
# - generally: when lib folders are out of sync with src folders 



# jump into project dir
cd $(dirname $0)


if [ ! -d node_modules ]; then
    echo "No npm packages installed, not able to reset things, run install.sh first"
    exit
fi


# 1 
# stop all
npx dev-pm shutdown

# 2
# delete all docker volumes 
docker-compose down --remove-orphans --volumes


# 3
# delete all files which are ignored in .gitignore (node_modules, dist, lib)
git clean -nXdf # dry run

read -p "Sure to remove these files? (y/n) " -n 1 -r
echo   
if [[ $REPLY =~ ^[Yy]$ ]]
then
    git clean -Xdf
fi

