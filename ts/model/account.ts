import JsErrorMap from "@js-accounts/jsError";
import { FnMigrate } from "js-mongo/esm/docMigrate";
import { Collection, Db, ObjectId } from "mongodb";

export type Account = {
    _id: ObjectId;
    identifier: Map<string, string>,
    property: Map<string, string>,
    verifier: Map<VerifierKey, AccountVerifier>
    createdAt: Date,
    updatedAt: Date,
}

export const docAccount = "accounts";

function getCol(db: Db): Collection<Account> {
    return db.collection<Account>(docAccount);
}

type AccountVerifier = {
    key: string,
    value: string,
}

type VerifierKey = "password" | "otp";

export type CreateAccountArgs = {
    identifier: Map<string, string>,
    property: Map<string, string>,
    verifier: Map<VerifierKey, AccountVerifier>
}

async function create(db: Db, {
    identifier,
    property,
    verifier,
}: CreateAccountArgs): Promise<Account> {
    const now = new Date();
    const account: Account = {
        _id: new ObjectId(),
        identifier,
        verifier,
        property,
        createdAt: now,
        updatedAt: now,
    };

    await getCol(db).insertOne(account);
    return account;
}

type ReplaceIndexArgs = {
    identifier: string[],
    property: string[],
}

async function replaceIndex(db: Db, i: ReplaceIndexArgs): Promise<void> {
    const col = getCol(db);

    const res = await col.dropIndexes();
    if (!res) throw JsErrorMap.failDropIndexes;

}

const migrate: FnMigrate[] = [];

const MngAccount = {
    migrate: migrate,
    create,
};

export default MngAccount;
