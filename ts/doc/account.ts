import { Schema } from "@js-mongo";
import Env from "@src/env";
import { AccountType } from "@src/type";
import { Collection, Db, ObjectId } from "mongodb";

const colNm = "accounts";
const fn = {
    col: (db: Db): Collection<AccountType.Data> => db.collection(colNm),
    upsertIndex: async (db: Db, {}): Promise<void> => {
        throw new Error("not impl");
    },
    create: async (db: Db, { identifier, property }: AccountType.CreateArgs): Promise<AccountType.Data> => {
        const now = new Date();
        const account: AccountType.Data = {
            _id: new ObjectId(),
            isActivate: Env.signUpActivate(),
            identifier,
            property,
            verifier: new Map<string, AccountType.Verifier>(),
            createdAt: now,
            updatedAt: now,
        };

        await fn.col(db).insertOne(account);
        return account;
    },
};

const doc: Schema<AccountType.Data> & typeof fn = {
    colNm,
    migrate: [],
    ...fn,
};

export default doc;
