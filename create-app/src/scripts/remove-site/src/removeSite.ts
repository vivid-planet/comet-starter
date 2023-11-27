import * as fs from "fs";

import { deleteFilesAndFolders } from "../../../util/deleteFilesAndFolders";

function removeSiteReferences() {
    removeReference(".vscode/settings.json", /, "site"/g);
    removeReference(".env", /.*site.*\n/gim);
    removeReference("install.sh", /.*site.*\n/gim);
    removeReference(".prettierignore", /.*site.*\n/gim);
    removeReference("copy-schema-files.js", /.*site.*\n/gim);
    removeReference("lint-staged.config.js", /.*site.*\n/gim);
    removeReference("admin/src/environment.ts", /, "SITES_CONFIG"/g);
    removeReference("./package.json", / browser:site/g);
    removeReference("./package.json", /.*site.*\n/gim);
    removeReference("admin/src/config.ts", /.*site.*\n/gim);
    removeReference("dev-pm.config.js", /{[\n ]*name: "site.*},\n/gis);
}

function removeReference(filePath: string, regex: RegExp) {
    const data = fs.readFileSync(filePath, "utf8");
    const result = data.replace(regex, "");
    fs.writeFileSync(filePath, result, "utf8");
}

function cwdIsCometProject(): boolean {
    return fs.existsSync("api/src/comet-config.json") && fs.readFileSync("admin/package.json", "utf8").includes("@comet");
}

export function removeSite() {
    if (!cwdIsCometProject()) {
        console.error("This command must be run from the root of a Comet project.");
        return;
    }
    deleteFilesAndFolders(["site"], false);
    removeSiteReferences();
}
