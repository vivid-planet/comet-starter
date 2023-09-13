import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export function cleanupWorkingDirectory(verbose: boolean) {
    const cleanupFilesDirectories = ["create-comet-app", ".git"];
    deleteFilesAndFolders(cleanupFilesDirectories, verbose);
}
