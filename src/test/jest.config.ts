import path from "path";
import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    verbose: true,
    preset: "ts-jest",
    testRegex: "^.+[ts|js|tsx|jsx]$",
    transform: {},
    moduleNameMapper: {
        "^@src/(.*)$": path.resolve("<rootDir>", "..",  "$1"),
    },
};

export default config;
