import kleur from "kleur";
import * as deleteFileOrFolder from "rimraf";

export async function deleteFilesAndFolders(files: string[], verbose: boolean): Promise<void> {
    for (const toDelete of files) {
        try {
            await deleteFileOrFolder.native(`./${toDelete}`, {
                maxRetries: 5,
                retryDelay: 1000,
            });
            if (verbose) {
                console.log(kleur.grey(`Info: Deleted ${toDelete}`));
            }
        } catch (e) {
            console.log(e);
            console.log(kleur.yellow(`Could not delete ${toDelete}`));
        }
    }
}
