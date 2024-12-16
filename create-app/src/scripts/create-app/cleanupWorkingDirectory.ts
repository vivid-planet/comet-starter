import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";
import { removeReferenceInFile } from "../../util/removeReferenceInFile";

export function cleanupWorkingDirectory(verbose: boolean) {
    deleteFilesAndFolders(["create-app", ".git", ".github", "LICENSE", ".digitalocean", "renovate.json", ".docker-compose"], verbose);
    removeReferenceInFile("lint-staged.config.js", /.*create-app.*\n/gim, verbose);
    removeReferenceInFile(".vscode/settings.json", /, "create-app"/g, verbose);
    removeReferenceInFile("install.sh", /^.*create-app.*$/gm, verbose);
}
