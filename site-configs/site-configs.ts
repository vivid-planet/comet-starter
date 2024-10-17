import fs from "fs/promises";
import { SiteConfig } from "./site-configs.d";

// Types for files in site-configs/
export type Environment = "local" | "dev" | "test" | "staging" | "prod";
export type GetSiteConfig = (env: Environment) => SiteConfig;

const isValidEnvironment = (env: string): env is Environment => {
    return ["local", "dev", "test", "staging", "prod"].includes(env);
}

// Called by `npx @comet/cli inject-site-configs`
const getSiteConfigs = async (env: string): Promise<SiteConfig[]> => {
    if(!isValidEnvironment(env)) {
        throw new Error(`Invalid environment: ${env}`);
    }
    
    const path = `${process.cwd()}/site-configs`;

    const files = (await fs.readdir(path)).filter((file) => (!file.startsWith("_") && !["site-configs.d.ts", "site-configs.ts"].includes(file)));
    const imports = (await Promise.all(files.map((file) => import(`${path}/${file}`)))) as { default: GetSiteConfig }[];
    return imports.map((module) => {
        const getSiteConfig = module.default;
        return getSiteConfig(env);
    });
};
export default getSiteConfigs;
