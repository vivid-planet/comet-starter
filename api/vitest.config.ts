import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: "node",
        setupFiles: ["./vitest.setup.ts"],
        reporters: ["default", "junit"],
        outputFile: { junit: "./junit.xml" },
    },
});
