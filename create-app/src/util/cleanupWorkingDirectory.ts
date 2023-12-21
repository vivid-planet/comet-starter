import fs from "fs";

import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export function cleanupWorkingDirectory(verbose: boolean) {
    deleteFilesAndFolders(["create-app", ".git", ".github", "LICENSE"], verbose);

    const lintStagedConfigFile = fs.readFileSync("lint-staged.config.js", "utf8").toString();
    fs.writeFileSync(
        "lint-staged.config.js",
        lintStagedConfigFile
            .split("\n")
            .filter((line) => !line.includes("create-app"))
            .join("\n"),
    );
}
