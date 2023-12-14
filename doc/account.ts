import { Bool } from "@d3v-friends/js-pure/fnType";
import jsError from "onError";
import { FnMigrate, PageArgs, ResultList } from "@d3v-friends/js-mongo/types";
import { Collection, Db as Database, ObjectId, SortDirection } from "mongodb";

export type Account = {
    _id: ObjectId;
    isActivate: boolean,
    identifier: Map<string, string>,
    property: Map<string, string>,
    verifier: Map<string, AccountVerifier>
    createdAt: Date,
    updatedAt: Date,
}

export const docAccount = "accounts";

function getCol(db: Database): Collection<Account> {
    return db.collection<Account>(docAccount);
}

type AccountVerifier = {
    key: string,
    value: string,
    mode: VerifierMode,
}

type VerifierMode = "password" | "otp";


/* -------------------------------------------------------------------------------------------------- */

export type CreateAccountArgs = {
    identifier: Map<string, string>,
    property: Map<string, string>,
    verifier: Map<string, AccountVerifier>
}

async function create(db: Database, {
    identifier,
    property,
    verifier,
}: CreateAccountArgs): Promise<Account> {
    const now = new Date();
    const isActivate = true;
    const account: Account = {
        _id: new ObjectId(),
        identifier,
        isActivate,
        verifier,
        property,
        createdAt: now,
        updatedAt: now,
    };

    await getCol(db).insertOne(account);
    return account;
}

/* -------------------------------------------------------------------------------------------------- */

type ReplaceIndexArgs = {
    identifier: string[],
    property: string[],
}

async function replaceIndex(db: Database, i: ReplaceIndexArgs): Promise<void> {
    const col = getCol(db);

    const res = await col.dropIndexes();
    if (!res) throw jsError.failDropIndexes;

    await col.createIndex({
        isActivate: 1,
    });


    for (let id of i.identifier) {
        await col.createIndex(
            { [`identifier.${id}`]: 1 },
            { unique: true },
        );
    }

    for (let id of i.property) {
        await col.createIndex(
            { [`property.${id}`]: 1 },
        );
    }

    return;
}

/* -------------------------------------------------------------------------------------------------- */


export type AccountUpdateArgs = {
    identifier?: Map<string, string>,
    property?: Map<string, string>,
    verifier?: Map<string, AccountVerifier>
    isActivate?: Bool,
}

function parseUpdate({ identifier, property, verifier, isActivate }: AccountUpdateArgs): object {
    const set: any = {
        updatedAt: new Date(),
    };

    if (identifier) {
        for (let key in identifier) {
            set[`identifier.${key}`] = identifier[key];
        }
    }

    if (property) {
        for (let key in property) {
            set[`property.${key}`] = property[key];
        }
    }

    if (verifier) {
        for (let key in verifier) {
            set[`verifier.${key}`] = verifier[key];
        }
    }

    if (isActivate) {
        set["isActivate"] = isActivate === "true";
    }

    return {
        $set: set,
    };
}


async function update(db: Database, f: AccountFindArgs, u: AccountUpdateArgs): Promise<Account> {
    const filter = parseFilter(f);
    const update = parseUpdate(u);
    await getCol(db).updateOne(filter, update);
    return findOne(db, f);
}

/* -------------------------------------------------------------------------------------------------- */
export type AccountFindArgs = {
    id?: ObjectId[],
    identifier?: Map<string, string>,
    property?: Map<string, string>,
}

function parseFilter({ id, identifier, property }: AccountFindArgs): object {
    const res: any = {};

    if (id) {
        res["_id"] = {
            "$in": id,
        };
    }

    if (identifier) {
        for (const key in identifier) {
            res[`identifier.${key}`] = identifier[key];
        }
    }

    if (property) {
        for (const key in property) {
            res[`property.${key}`] = property[key];
        }
    }

    if (!res) throw jsError.findFilterIsNull;

    return res;
}

export type AccountSortArgs = {
    identifier?: Map<string, SortDirection>
    property?: Map<string, SortDirection>
}

function parseSort({ identifier, property }: AccountSortArgs): Map<string, SortDirection> {
    const res = new Map<string, SortDirection>();
    if (identifier) {
        for (let key in identifier) {
            res[`identifier.${key}`] = identifier[key];
        }
    }

    if (property) {
        for (let key in property) {
            res[`property.${key}`] = property[key];
        }
    }

    return res;
}

function getSort(sorts: AccountSortArgs[]): AccountSortArgs {
    if (sorts.length == 0) return {};
    return sorts[0];
}

async function findOne(db: Database, i: AccountFindArgs, ...sorts: AccountSortArgs[]): Promise<Account> {
    const filter = parseFilter(i);
    const sort = parseSort(getSort(sorts));
    const col = getCol(db);

    const account = await col.findOne(filter, {
        sort,
    });

    if (!account) throw jsError.notFoundAccount;

    return account;
}

async function findAll(db: Database, i: AccountFindArgs, ...sorts: AccountSortArgs[]): Promise<Account[]> {
    const filter = parseFilter(i);
    const sort = parseSort(getSort(sorts));
    const col = getCol(db);

    const cur = await col.find(filter, {
        sort,
    });

    const ls: Account[] = [];

    while (await cur.hasNext()) {
        const account = await cur.next();
        if (!account) break;
        ls.push(account);
    }

    return ls;
}

async function findList(db: Database, i: AccountFindArgs, p: PageArgs, ...s: AccountSortArgs[]): Promise<ResultList<Account>> {
    const filter = parseFilter(i);
    const sort = parseSort(getSort(s));
    const col = getCol(db);

    const total = await col.countDocuments(filter);
    const cur = await col.find(filter, {
        sort,
        skip: p.page * p.size,
        limit: p.size,
    });

    const list: Account[] = [];
    while (await cur.hasNext()) {
        list.push(await cur.next());
    }

    return {
        ...p,
        total,
        list,
    };
}


/* -------------------------------------------------------------------------------------------------- */


const migrate: FnMigrate[] = [
    // async db => {
    //     await replaceIndex(db, {
    //         identifier: ["username", "email"],
    //         property: [],
    //     });
    //     return "init account indexing";
    // },
];

const MngAccount = {
    migrate,
    create,
    update,
    replaceIndex,
};

export default MngAccount;
