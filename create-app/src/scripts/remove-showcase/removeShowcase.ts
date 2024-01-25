import { ESLint } from "eslint";
import { existsSync, readFileSync, writeFileSync } from "fs";
import kleur from "kleur";

import { cwdIsCometProject } from "../../util/cwdIsCometProject";
import { deleteFilesAndFolders } from "../../util/deleteFilesAndFolders";

async function removeFileContent() {
    const contentToRemove: Array<{
        file: string;
        replacements: RegExp[];
    }> = [
        {
            file: `./admin/src/Routes.tsx`,
            replacements: [/<.*?products.*?>/gs],
        },
        {
            file: `./admin/src/common/MasterMenu.tsx`,
            replacements: [/<MenuItemRouterLink[ \n]*primary={intl.formatMessage\({ id: "comet.menu.products".*products`}[ \n]*\/>/gs],
        },
        {
            file: `./api/src/app.module.ts`,
            replacements: [/ProductsModule,\n/gs],
        },
        {
            file: `./api/src/db/fixtures/fixtures.console.ts`,
            replacements: [/constructor.*Product.*{}/gs, /await Promise.all\(\[generateProducts.*]\);/gs],
        },
        {
            file: `./api/src/db/fixtures/fixtures.module.ts`,
            replacements: [/imports: \[MikroOrmModule.forFeature\(\[Product]\), ConfigModule, ConsoleModule],/gs],
        },
    ];
    const eslint = new ESLint({
        cwd: process.cwd(),
        fix: true,
    });
    for (const content of contentToRemove) {
        if (!existsSync(content.file)) {
            console.log(kleur.bgYellow(`File: ${content.file} does not exist!`));
            console.log(kleur.bgYellow(`Skipping: ${content.file}...`));
            continue;
        }
        let fileContent = readFileSync(content.file).toString();
        for (const replacement of content.replacements) {
            fileContent = fileContent.replaceAll(replacement, "");
        }
        try {
            const lintedFileContent = await eslint.lintText(fileContent, {
                filePath: content.file,
            });
            const output = lintedFileContent[0] && lintedFileContent[0].output ? lintedFileContent[0].output : lintedFileContent[0].source;
            writeFileSync(content.file, output ?? fileContent);
        } catch (e) {
            writeFileSync(content.file, fileContent);
            console.log(kleur.yellow(`Could not lint: ${content.file}!`));
            console.log(e);
        }
    }
}

export async function removeShowcaseContent() {
    if (!cwdIsCometProject()) {
        console.log(kleur.bgYellow(`This command must be run from the root of a Comet project.`));
        return;
    }

    await removeFileContent();
    const filesToRemove: string[] = [
        "api/src/products",
        "admin/src/products",
        "api/src/db/fixtures/generators/product.fixture.ts",
        "api/src/db/migrations/Migration20220721123033.ts",
    ];
    deleteFilesAndFolders(filesToRemove, false);
}
