import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { removeReferenceInFile } from "../../util/removeReferenceInFile";

function removeSiteReferences() {
    removeReferenceInFile(".vscode/settings.json", /, "site"/g);
    removeReferenceInFile(".env", /# site.*NEXT_PUBLIC_SITE_IS_PREVIEW=false\n\n/gms);
    removeReferenceInFile("install.sh", /.*site.*\n/gim);
    removeReferenceInFile(".prettierignore", /.*site.*\n/gim);
    removeReferenceInFile("copy-schema-files.js", /.*site.*\n/gim);
    removeReferenceInFile("lint-staged.config.js", /.*site.*\n/gim);
    removeReferenceInFile("./package.json", / browser:site/g);
    removeReferenceInFile("./package.json", /.*site.*\n/gim);
    removeReferenceInFile("dev-pm.config.js", /{[\n ]*name: "site.*},\n/gis);
}

export function removeSite() {
    deleteFilesAndFolders(["site"], false);
    removeSiteReferences();
}
