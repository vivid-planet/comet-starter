import * as fs from "fs";

import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { removeReferenceInFile } from "../../util/removeReferenceInFile";
import { runEslintFix } from "../../util/runEslintFix";

function removeSiteReferences(verbose: boolean) {
    removeReferenceInFile(".vscode/settings.json", /, "site"/g, verbose);
    removeReferenceInFile(".env", /# site.*NEXT_PUBLIC_API_URL=\$API_URL\n\n/gms, verbose);
    removeReferenceInFile("install.sh", /.*site.*\n/gim, verbose);
    removeReferenceInFile(".prettierignore", /.*site.*\n/gim, verbose);
    removeReferenceInFile("copy-schema-files.js", /.*site.*\n/gim, verbose);
    removeReferenceInFile("lint-staged.config.js", /.*site.*\n/gim, verbose);
    removeReferenceInFile("./package.json", / browser:site/g, verbose);
    removeReferenceInFile("./package.json", /\|site\|create-app/g, verbose);
    removeReferenceInFile("./package.json", /.*site.*\n/gim, verbose);
    removeReferenceInFile("dev-pm.config.js", /{[\n ]*name: "site.*},\n/gis, verbose);
}

export function removeSite(verbose: boolean) {
    deleteFilesAndFolders(["site", "site-configs", ".env.site-configs.tpl"], verbose);
    fs.copyFile("./create-app/site-configs.d.ts", "./admin/src/site-configs.d.ts", (err) => console.log);
    fs.copyFile("./create-app/site-configs.d.ts", "./api/src/site-configs.d.ts", (err) => console.log);
    removeSiteReferences(verbose);
    runEslintFix(verbose);
}
