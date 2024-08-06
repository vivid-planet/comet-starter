import fs from "fs/promises";
import { SiteConfig } from "./site-configs.d";

// Types for files in site-configs/
export type Environment = "local" | "dev" | "test" | "staging" | "prod";
export type GetSiteConfig = (env: Environment) => SiteConfig;

// Called by `npx @comet/cli inject-site-configs`
const getSiteConfigs = async (env: Environment): Promise<SiteConfig[]> => {
    const path = `${__dirname}/site-configs`;

    const files = (await fs.readdir(path)).filter((file) => !file.startsWith("_"));
    const imports = (await Promise.all(files.map((file) => import(`${path}/${file}`)))) as { default: GetSiteConfig }[];
    return imports.map((imprt, index) => {
        const getSiteConfig = imprt.default;
        return getSiteConfig(env);
    });
};
export default getSiteConfigs;
