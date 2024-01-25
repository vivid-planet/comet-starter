import * as fs from "fs";

const readmePath = "README.md";

export function cleanupReadme() {
    const originalReadme = fs.readFileSync(readmePath, "utf8").toString();
    const newReadme = originalReadme.replace(/.+<!-- PROJECT_README_BEGIN.+-->\n\n/s, "");
    fs.writeFileSync(readmePath, newReadme, "utf8");
}
