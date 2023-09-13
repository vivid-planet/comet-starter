import kleur from "kleur";
import * as deleteFileOrFolder from "rimraf";

export function deleteFilesAndFolders(files: string[], verbose: boolean) {
    for (const toDelete of files) {
        try {
            deleteFileOrFolder.sync(`./${toDelete}`, {
                maxRetries: 5,
                retryDelay: 1000,
            });
            if (verbose) {
                console.log(kleur.grey(`Info: Deleted ${toDelete}`));
            }
        } catch (e) {
            if (verbose) {
                console.log(e);
            }
            console.log(kleur.yellow(`Could not delete ${toDelete}`));
        }
    }
}
