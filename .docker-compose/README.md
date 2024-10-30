sed -i '' 's/dev\.comet\-dxp\.com/comet-starter-site-tyqqf.ondigitalocean.app/g' site-configs/main.ts
APP_ENV=dev npx -y @comet/cli inject-site-configs -f ../../../../../site-configs/site-configs.ts -i .docker-compose/docker-compose.tpl.yml -o .docker-compose/docker-compose.yml

docker compose -f .docker-compose/docker-compose.yml build
docker compose -f .docker-compose/docker-compose.yml up
