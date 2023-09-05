import { deleteFilesAndFolders } from "./deleteFilesAndFolders";

export async function cleanupWorkingDirectory(verbose: boolean): Promise<void> {
    const cleanupFilesDirectories = ["create-comet-app", ".git"];
    await deleteFilesAndFolders(cleanupFilesDirectories, verbose);
}
