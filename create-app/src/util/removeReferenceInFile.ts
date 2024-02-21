import * as fs from "fs";

export function removeReferenceInFile(filePath: string, regex: RegExp) {
    const data = fs.readFileSync(filePath, "utf8");
    const result = data.replace(regex, "");
    fs.writeFileSync(filePath, result, "utf8");
}
