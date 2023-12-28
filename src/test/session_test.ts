import { fnMongo } from "@js-mongo";
import { fnEnv } from "@js-pure";
import { beforeAll, describe } from "@jest/globals";
import { AccountManager, SessionManager } from "@src/doc";
import { fnTest } from "@src/test/all_test";
import { Account } from "@src/type/account";
import { Session } from "@src/type/session";
import { Connection, Model } from "mongoose";

describe("session", () => {
    let conn: Connection;
    let model: Model<Session>;
    let accountModel: Model<Account>;
    const manager = new SessionManager();
    const accountManager = new AccountManager();

    beforeAll(async () => {
        await fnEnv.read(__dirname, ".env");
        conn = await fnMongo.connectByEnv();
        model = manager.model(conn);
        accountModel = accountManager.model(conn);
    });

    test("create", async () => {
        const account = await accountManager.create(accountModel, fnTest.createAccountArgs());

        const args = fnTest.createSessionArgs({ accountId: account._id });
        const token = await manager.create(model, args);
        const loadedAccount = await manager.verify(model, {
            token,
            ip: args.ip,
            userAgent: args.userAgent,
        });

        expect(loadedAccount).toStrictEqual(account);
    });
});
