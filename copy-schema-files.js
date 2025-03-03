const fs = require("fs");

(async () => {
    await Promise.all([
        fs.promises.copyFile("api/block-meta.json", "admin/block-meta.json"),
        fs.promises.copyFile("api/block-meta.json", "site/block-meta.json"),
        fs.promises.copyFile("api/schema.gql", "admin/schema.gql"),
        fs.promises.copyFile("api/schema.gql", "site/schema.gql"),
        fs.promises.copyFile("api/src/comet-config.json", "site/src/comet-config.json"),
        fs.promises.copyFile("api/src/comet-config.json", "admin/src/comet-config.json"),
        fs.promises.copyFile("site-configs/site-configs.d.ts", "api/src/site-configs.d.ts"),
        fs.promises.copyFile("site-configs/site-configs.d.ts", "admin/src/site-configs.d.ts"),
        fs.promises.copyFile("site-configs/site-configs.d.ts", "site/src/site-configs.d.ts"),
    ]);
})();
