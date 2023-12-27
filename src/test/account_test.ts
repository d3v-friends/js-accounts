import { faker } from "@faker-js/faker";
import { describe, test, expect, beforeAll } from "@jest/globals";
import { fnMongo } from "@js-mongo";
import { fnEnv } from "@js-pure";
import { Db } from "mongodb";
import { AccountManager } from "../doc";

describe("account", () => {
    let db: Db;

    // beforeAll(async () => {
    //     await fnEnv.read(__dirname, ".env");
    //
    //     db = await fnMongo.connect({
    //         host: fnEnv.string("MG_HOST"),
    //         username: fnEnv.string("MG_USERNAME"),
    //         password: fnEnv.string("MG_PASSWORD"),
    //         database: fnEnv.string("MG_DATABASE"),
    //     });
    //
    //     await fnMongo.migrate(db, new AccountManager());
    // });
    //
    // test("create", async () => {
    //     const mng = new AccountManager();
    //     const data = await mng.create(db, {
    //         identifier: {
    //             username: faker.internet.userName(),
    //         },
    //         property: {
    //             age: faker.number.int({ max: 100 }),
    //         },
    //         verifier: {
    //             password: {
    //                 key: "salt",
    //                 value: "saltedPassword",
    //                 mode: "compare",
    //             },
    //         },
    //     });
    //
    //     expect(data.isActivate).toBe(true);
    //     expect(data.verifier["password"].key).toBe("salt");
    // });
});
