const { readFileSync } = require("fs");
const { buildSchema } = require("graphql");

const schema = buildSchema(readFileSync("./schema.gql").toString());

const rootBlocks = Object.keys(schema.getTypeMap()).filter((type) => type.endsWith("BlockData"));

const pluginConfig = {
    avoidOptionals: {
        field: true,
    },
    enumsAsTypes: true,
    namingConvention: "keep",
    scalars: rootBlocks.reduce((scalars, rootBlock) => ({ ...scalars, [rootBlock]: rootBlock }), { DateTime: "string" }),
    typesPrefix: "GQL",
};

/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config ={
    schema: "schema.gql",
    emitLegacyCommonJSImports: false,
    generates: {
        "./app/graphql.generated.ts": {
            plugins: [{ add: { content: `import type { ${rootBlocks.sort().join(", ")} } from "./blocks.generated";` } }, "typescript"],
            config: pluginConfig,
        },
        "./app/": {
            documents: ["./app/**/!(*.generated).{ts,tsx}"],
            preset: "near-operation-file",
            presetConfig: {
                extension: ".generated.ts",
                baseTypesPath: "graphql.generated.ts",
            },
            plugins: [
                { add: { content: `import type { ${rootBlocks.sort().join(", ")} } from "@app/blocks.generated";` } },
                "named-operations-object",
                "typescript-operations",
            ],
            config: pluginConfig,
        },
    },
};

module.exports = config;
