import fs from "fs";

export const createPublicGeneratedDirectory = () => {
    const generatedDirectory = "./.next/public.generated/";

    if (!fs.existsSync(generatedDirectory)) {
        console.log(`✅ Successfully created temp directory: ${generatedDirectory}`);

        fs.mkdirSync(generatedDirectory, { recursive: true });
    }
    return generatedDirectory;
};
