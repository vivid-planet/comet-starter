import { defineConfig } from "@comet/dev-process-manager";

export default defineConfig({
    scripts: [
        {
            name: "docker",
            script: "docker compose up",
            group: "api",
        },
        {
            name: "admin",
            script: "pnpm --dir admin run start",
            group: "admin",
            waitOn: ["tcp:$API_PORT"],
        },
        {
            name: "admin-codegen",
            script: "pnpm --dir admin run gql:watch",
            group: "admin",
            waitOn: ["tcp:$ADMIN_PORT"],
        },
        {
            name: "admin-block-codegen",
            script: "pnpm --dir admin run generate-block-types:watch",
            group: "admin",
            waitOn: ["tcp:$ADMIN_PORT"],
        },
        {
            name: "auth-provider",
            script: "pnpm run dev:auth-provider",
            group: "admin",
        },
        {
            name: "auth-proxy",
            script: "pnpm run dev:auth-proxy",
            group: "admin",
            waitOn: ["tcp:$IDP_PORT", "tcp:$ADMIN_PORT"],
        },
        {
            name: "api",
            script: "pnpm --dir api run start:dev",
            group: "api",
            waitOn: ["tcp:$POSTGRESQL_PORT", "tcp:$IMGPROXY_PORT"],
        },
        {
            name: "api-generator",
            script: "pnpm --dir api run api-generator:watch",
            group: "api",
        },
        {
            name: "site",
            script: "pnpm --dir site run dev",
            group: "site",
            waitOn: ["tcp:$API_PORT"],
        },
        {
            name: "site-css-types",
            script: "pnpm --dir site run css:types:watch",
            group: ["site"],
        },
        {
            name: "site-codegen",
            script: "pnpm --dir site run gql:watch",
            group: "site",
            waitOn: ["tcp:$SITE_PORT"],
        },
        {
            name: "site-block-codegen",
            script: "pnpm --dir site run generate-block-types:watch",
            group: "site",
            waitOn: ["tcp:$SITE_PORT"],
        },
    ],
});
