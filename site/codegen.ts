import { type CodegenConfig } from "@graphql-codegen/cli";
import { readFileSync } from "fs";
import { buildSchema } from "graphql";

const schema = buildSchema(readFileSync("./schema.gql").toString());

const rootBlocks = Object.keys(schema.getTypeMap()).filter((type) => type.endsWith("BlockData"));

const pluginConfig = {
    avoidOptionals: {
        field: true,
    },
    enumsAsTypes: true,
    namingConvention: "keep",
    scalars: rootBlocks.reduce((scalars, rootBlock) => ({ ...scalars, [rootBlock]: rootBlock }), { DateTime: "string", LocalDate: "string" }),
    typesPrefix: "GQL",
};

const config: CodegenConfig = {
    schema: "schema.gql",
    generates: {
        "./src/graphql.generated.ts": {
            plugins: [{ add: { content: `import { ${rootBlocks.sort().join(", ")} } from "./blocks.generated";` } }, "typescript"],
            config: pluginConfig,
        },
        "./src/": {
            documents: "./src/**/!(*.generated).{ts,tsx}",
            preset: "near-operation-file",
            presetConfig: {
                extension: ".generated.ts",
                baseTypesPath: "graphql.generated.ts",
            },
            plugins: [
                { add: { content: `import { ${rootBlocks.sort().join(", ")} } from "@src/blocks.generated";` } },
                "named-operations-object",
                "typescript-operations",
            ],
            config: pluginConfig,
        },
    },
    ignoreNoDocuments: true,
};

export default config;
