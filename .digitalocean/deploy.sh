#!/bin/bash

# TODO move me to project root and change app ids if in use

doctl apps update zzzz --spec .digitalocean/comet-starter-imgproxy.yaml

sed -i '' 's/dev\.comet\-dxp\.com/comet-starter-site-tyqqf.ondigitalocean.app/g' site-configs/main.ts

APP_ENV=dev npx -y @comet/cli inject-site-configs -i .digitalocean/comet-starter-cms.tpl.yaml -o .digitalocean/comet-starter-cms.yaml
doctl apps update xxxx --spec .digitalocean/comet-starter-cms.yaml # Configuration-Changes
doctl apps create-deployment xxxx # Code-Changes

APP_ENV=dev npx -y @comet/cli inject-site-configs -i .digitalocean/comet-starter-site-main.tpl.yaml -o .digitalocean/comet-starter-site-main.yaml
doctl apps update yyyy --spec .digitalocean/comet-starter-site-main.yaml # Configuration-Changes
doctl apps create-deployment yyyy # Code-Changes
