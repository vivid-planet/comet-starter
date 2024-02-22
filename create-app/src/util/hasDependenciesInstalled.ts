import fs from "fs";

export function hasDependenciesInstalled(microservice: string): boolean {
    const files = fs.readdirSync(`${process.cwd()}/${microservice}`);
    if (!files.includes("package.json")) {
        return false;
    }
    const packageJson = fs.readFileSync(`${process.cwd()}/${microservice}/package.json`, "utf8");
    return (
        (packageJson.includes("dependencies") || packageJson.includes("devDependencies")) &&
        fs.existsSync(`${process.cwd()}/${microservice}/node_modules`)
    );
}
