import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    setupFilesAfterEnv: ["../jest.setup.ts"],
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    moduleFileExtensions: ["js", "json", "ts"],
    moduleNameMapper: {
        "@src/(.*)": "<rootDir>/$1",
    },
    rootDir: "src",
    testEnvironment: "node",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest",
    },
};

export default config;
