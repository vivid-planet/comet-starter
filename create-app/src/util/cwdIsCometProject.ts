import fs from "fs";

export function cwdIsCometProject(): boolean {
    return fs.existsSync("api/src/comet-config.json");
}
