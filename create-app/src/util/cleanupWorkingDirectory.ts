import { deleteFilesAndFolders } from "./deleteFilesAndFolders";
import { removeReferenceInFile } from "./removeReferenceInFile";

export function cleanupWorkingDirectory(verbose: boolean) {
    deleteFilesAndFolders(["create-app", ".git", ".github", "LICENSE"], verbose);
    removeReferenceInFile("lint-staged.config.js", /.*create-app.*\n/gim);
    removeReferenceInFile(".vscode/settings.json", /, "create-app"/g);
}
