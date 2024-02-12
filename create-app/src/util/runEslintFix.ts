import { execSync } from "child_process";
import fs from "fs";

import { hasDependenciesInstalled } from "./hasDependenciesInstalled";

export function runEslintFix() {
    const microservices = ["admin", "api", "site"];
    console.log("Fixing ESLint errors");

    for (const microservice of microservices) {
        if (!fs.existsSync(microservice)) {
            continue;
        } else if (!hasDependenciesInstalled(microservice)) {
            console.warn(`Cannot fix ESLint errors in ${microservice} because it has no dependencies installed`);
            continue;
        }

        try {
            if (microservice !== "api") execSync(`npm --prefix ${microservice} run lint:prepare`);
            execSync(`npm run --prefix ${microservice} --no-audit --loglevel error lint:eslint -- --fix`);
        } catch (err) {
            console.error(`Failed to fix ESLint errors in ${microservice}. See original error below`);
            console.error(err);
            process.exit(1);
        }
    }
}
