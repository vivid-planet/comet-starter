import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export function cleanupWorkingDirectory(verbose: boolean) {
    const cleanupFilesDirectories = ["create-app", ".git"];
    deleteFilesAndFolders(cleanupFilesDirectories, verbose);
}
