import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export function cleanupWorkingDirectory(verbose: boolean) {
    const cleanupFilesDirectories = ["create-app", ".git", ".github"];
    deleteFilesAndFolders(cleanupFilesDirectories, verbose);
}
