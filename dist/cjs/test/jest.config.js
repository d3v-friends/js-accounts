"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    verbose: true,
    preset: "ts-jest",
    testRegex: "^.+[ts|js|tsx|jsx]$",
    transform: {},
    moduleNameMapper: {
        "^@src/(.*)$": path_1.default.resolve("<rootDir>", "..", "$1"),
    },
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdC9qZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDhDQUF3QjtBQUd4QixJQUFNLE1BQU0sR0FBeUI7SUFDakMsT0FBTyxFQUFFLElBQUk7SUFDYixNQUFNLEVBQUUsU0FBUztJQUNqQixTQUFTLEVBQUUscUJBQXFCO0lBQ2hDLFNBQVMsRUFBRSxFQUFFO0lBQ2IsZ0JBQWdCLEVBQUU7UUFDZCxhQUFhLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFHLElBQUksQ0FBQztLQUN4RDtDQUNKLENBQUM7QUFFRixrQkFBZSxNQUFNLENBQUMifQ==