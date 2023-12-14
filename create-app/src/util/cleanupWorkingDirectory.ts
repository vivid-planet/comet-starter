import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export function cleanupWorkingDirectory(verbose: boolean) {
    deleteFilesAndFolders(["create-app", ".git", ".github", "LICENSE"], verbose);
}
