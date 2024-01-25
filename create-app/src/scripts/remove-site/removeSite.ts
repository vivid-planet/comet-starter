import { program } from "commander";

import { cwdIsCometProject } from "../../util/cwdIsCometProject";
import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { removeReferenceInFile } from "../../util/removeReferenceInFile";

function removeSiteReferences() {
    removeReferenceInFile(".vscode/settings.json", /, "site"/g);
    removeReferenceInFile(".env", /.*site.*\n/gim);
    removeReferenceInFile("install.sh", /.*site.*\n/gim);
    removeReferenceInFile(".prettierignore", /.*site.*\n/gim);
    removeReferenceInFile("copy-schema-files.js", /.*site.*\n/gim);
    removeReferenceInFile("lint-staged.config.js", /.*site.*\n/gim);
    removeReferenceInFile("admin/src/environment.ts", /, "SITES_CONFIG"/g);
    removeReferenceInFile("./package.json", / browser:site/g);
    removeReferenceInFile("./package.json", /.*site.*\n/gim);
    removeReferenceInFile("admin/src/config.ts", /.*site.*\n/gim);
    removeReferenceInFile("dev-pm.config.js", /{[\n ]*name: "site.*},\n/gis);
}

export function removeSite() {
    if (!cwdIsCometProject()) {
        program.error("This command must be run from the root of a Comet project.");
    }
    deleteFilesAndFolders(["site"], false);
    removeSiteReferences();
}
