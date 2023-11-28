import fs from "fs";

export function cwdIsCometProject(): boolean {
    return fs.existsSync("api/src/comet-config.json") && fs.readFileSync("admin/package.json", "utf8").includes("@comet");
}
