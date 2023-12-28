import { describe, test, expect, beforeAll } from "@jest/globals";
import { fnMongo } from "@js-mongo";
import { fnEnv } from "@js-pure";
import { fnTest } from "@src/test/all_test";
import { Connection, Model } from "mongoose";
import { AccountManager } from "../doc";
import { Account } from "../type/account";

describe("account", () => {
    let conn: Connection;
    let model: Model<Account>;
    const manager = new AccountManager();

    beforeAll(async () => {
        await fnEnv.read(__dirname, ".env");
        conn = await fnMongo.connectByEnv();
        model = manager.model(conn);
    });

    test("create account", async () => {
        const account = await manager.create(model, fnTest.createAccountArgs());
    });

    test("reindex", async () => {
        // indexing 은 create 하는 어카운트랑 맞춰서 똑같아야 한다.
        await manager.reindex(conn, {
            identifier: ["username"],
            property: ["nickname"],
        });

        const ls = await manager.getIndexList(model);
        const result = {
            identifier: ["identifier.username_1"],
            property: ["property.nickname_1"],
            other: ["_id_", "isActivate_1"],
        };

        expect(ls).toStrictEqual(result);
    });

    test("update one", async () => {
        const account = await manager.create(model, fnTest.createAccountArgs());
        const update = fnTest.createAccountArgs();
        const updatedAccount = await manager.updateOne(
            model,
            {
                id: [account._id],
            },
            {
                identifier: {
                    username: update.identifier.username,
                },
            }
        );

        expect(updatedAccount.identifier.username).toEqual(update.identifier.username);
    });
});
