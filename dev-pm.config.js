module.exports = {
    scripts: [
        {
            name: "docker",
            script: "docker compose up",
            group: "api",
        },
        {
            name: "admin",
            script: "npm run --prefix admin start",
            group: "admin",
        },
        {
            name: "admin-codegen",
            script: "npm --prefix admin run gql:watch",
            group: "admin",
            waitOn: ["tcp:$ADMIN_PORT"],
        },
        {
            name: "admin-block-codegen",
            script: "npm --prefix admin run generate-block-types:watch",
            group: "admin",
            waitOn: ["tcp:$ADMIN_PORT"],
        },
        {
            name: "api",
            script: "npm --prefix api run db:migrate && npm --prefix api run start:dev",
            group: "api",
            waitOn: ["tcp:$POSTGRESQL_PORT", "tcp:$IMGPROXY_PORT"],
        },
        {
            name: "site",
            script: "npm --prefix site run dev",
            group: "site",
            waitOn: ["tcp:$API_PORT"],
        },
        {
            name: "site-codegen",
            script: "npm --prefix site run gql:watch",
            group: "site",
            waitOn: ["tcp:$SITE_PORT"],
        },
        {
            name: "site-block-codegen",
            script: "npm --prefix site run generate-block-types:watch",
            group: "site",
            waitOn: ["tcp:$SITE_PORT"],
        },
    ],
};
