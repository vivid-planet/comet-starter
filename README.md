# Comet DXP Starter

In use by `@comet/create-app` to create new Comet DXP projects. Find more information in the [Comet DXP documentation](https://docs.comet-dxp.com).

<!-- PROJECT_README_BEGIN Everything below this line will go into the Readme of projects created by @comet/create-app -->

## Development

### Requirements

-   [nvm](https://github.com/nvm-sh/nvm)
-   [docker & docker-compose](https://docs.docker.com/compose/)

### Installation

    // Optionally set domain to use instead of localhost (add to ~/.bashrc)
    export DEV_DOMAIN=my-name.dev.vivid-planet.cloud // Vivid Planet network

    // Execute following script
    ./install.sh

### Run Services

    // use correct Node version https://github.com/nvm-sh/nvm#deeper-shell-integration
    nvm use

    // All services
    pnpm run dev

    pnpm exec dev-pm status [--interval]
    pnpm exec dev-pm logs <service>
    pnpm exec dev-pm restart <service>
    pnpm exec dev-pm shutdown

    // import fixtures
    pnpm --dir api run fixtures

    // start repl
    pnpm --dir api run repl
