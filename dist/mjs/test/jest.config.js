import path from "path";
var config = {
    verbose: true,
    preset: "ts-jest",
    testRegex: "^.+[ts|js|tsx|jsx]$",
    transform: {},
    moduleNameMapper: {
        "^@src/(.*)$": path.resolve("<rootDir>", "..", "$1"),
    },
};
export default config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVzdC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdC9qZXN0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFHeEIsSUFBTSxNQUFNLEdBQXlCO0lBQ2pDLE9BQU8sRUFBRSxJQUFJO0lBQ2IsTUFBTSxFQUFFLFNBQVM7SUFDakIsU0FBUyxFQUFFLHFCQUFxQjtJQUNoQyxTQUFTLEVBQUUsRUFBRTtJQUNiLGdCQUFnQixFQUFFO1FBQ2QsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRyxJQUFJLENBQUM7S0FDeEQ7Q0FDSixDQUFDO0FBRUYsZUFBZSxNQUFNLENBQUMifQ==