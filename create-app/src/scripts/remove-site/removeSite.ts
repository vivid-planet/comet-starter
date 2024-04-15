import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { removeReferenceInFile } from "../../util/removeReferenceInFile";
import { runEslintFix } from "../../util/runEslintFix";

function removeSiteReferences(verbose: boolean) {
    removeReferenceInFile(".vscode/settings.json", /, "site"/g, verbose);
    removeReferenceInFile(".env", /# site.*NEXT_PUBLIC_SITE_IS_PREVIEW=false\n\n/gms, verbose);
    removeReferenceInFile("install.sh", /.*site.*\n/gim, verbose);
    removeReferenceInFile(".prettierignore", /.*site.*\n/gim, verbose);
    removeReferenceInFile("copy-schema-files.js", /.*site.*\n/gim, verbose);
    removeReferenceInFile("lint-staged.config.js", /.*site.*\n/gim, verbose);
    removeReferenceInFile("./package.json", / browser:site/g, verbose);
    removeReferenceInFile("./package.json", /site\|create-app/g, verbose);
    removeReferenceInFile("./package.json", /.*site.*\n/gim, verbose);
    removeReferenceInFile("dev-pm.config.js", /{[\n ]*name: "site.*},\n/gis, verbose);
}

export function removeSite(verbose: boolean) {
    deleteFilesAndFolders(["site"], verbose);
    removeSiteReferences(verbose);
    runEslintFix(verbose);
}
