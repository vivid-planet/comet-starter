import { existsSync, readFileSync, writeFileSync } from "fs";
import kleur from "kleur";

import { deleteFilesAndFolders } from "./deleteFilesAndFolders";
import { ESLint } from "eslint";

async function removeFileContent(verbose: boolean): Promise<void> {
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

    contentToRemove.map((content) => {
        if (!existsSync(content.file)) {
            console.log(kleur.bgYellow(`File: ${content.file} does not exist!`));
            console.log(kleur.bgYellow(`Skipping: ${content.file}...`));
        } else {
            let fileContent = readFileSync(content.file).toString();

            content.replacements.map((stringToRemove) => {
                fileContent = fileContent.replaceAll(stringToRemove, "");
            });

            try {
                eslint
                    .lintText(fileContent, {
                        filePath: content.file,
                    })
                    .then((lintedFileContent) => {
                        const output =
                            lintedFileContent[0] && lintedFileContent[0].output ? lintedFileContent[0].output : lintedFileContent[0].source;
                        writeFileSync(content.file, output ?? fileContent);
                    })
                    .catch(() => {
                        writeFileSync(content.file, fileContent);
                        console.log(kleur.yellow(`Could not lint: ${content.file}!`));
                    });

                if (verbose) {
                    console.log(kleur.grey(`Info: Replaced content in ${content.file}`));
                }
            } catch (e) {
                console.log(kleur.yellow(`Could not save changes in: ${content.file}!`));
            }
        }
    });
}

export async function removeShowcaseContent(verbose: boolean): Promise<void> {
    await removeFileContent(verbose);
    const filesToRemove: string[] = [
        "api/src/products",
        "admin/src/products",
        "api/src/db/fixtures/generators/product.fixture.ts",
        "api/src/db/migrations/Migration20220721123033.ts",
    ];
    await deleteFilesAndFolders(filesToRemove, verbose);
}
