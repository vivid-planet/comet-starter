import fs from "fs";

export function hasDependenciesInstalled(relPath: string): boolean {
    const files = fs.readdirSync(`${process.cwd()}/${relPath}`);
    if (!files.includes("package.json")) {
        return false;
    }
    const packageJson = fs.readFileSync(`${process.cwd()}/${relPath}/package.json`, "utf8");
    return (packageJson.includes("dependencies") || packageJson.includes("devDependencies")) && fs.existsSync("node_modules");
}
