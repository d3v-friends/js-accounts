/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
import { Manager, Pager, ResultList } from "@js-mongo";
import { Connection, Schema } from "mongoose";
import type { Account } from "@src/type";
export declare class AccountManager extends Manager<Account.Data> {
    readonly migrate: never[];
    readonly colNm: string;
    readonly schema: Schema<Account, import("mongoose").Model<Account, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        [x: string]: any;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        [x: string]: any;
    }>> & import("mongoose").FlatRecord<{
        [x: string]: any;
    }> & Required<{
        _id: unknown;
    }>>;
    constructor(...colNms: string[]);
    create(conn: Connection, { identifier, property, verifier, }: Account.CreateArgs): Promise<Account.Data>;
    updateOne(conn: Connection, f: Account.FindArgs, u: Account.UpdateArgs): Promise<Account.Data>;
    updateMany(conn: Connection, f: Account.FindArgs, u: Account.UpdateArgs): Promise<Account.Data[]>;
    findOne(conn: Connection, f: Account.FindArgs, ...sorts: Account.SortArgs[]): Promise<Account.Data>;
    findAll(conn: Connection, f: Account.FindArgs, ...sorts: Account.SortArgs[]): Promise<Account.Data[]>;
    findList(conn: Connection, f: Account.FindArgs, p: Pager, ...sorts: Account.SortArgs[]): Promise<ResultList<Account.Data>>;
    index(conn: Connection, { identifier, property }: Account.IndexArgs): Promise<void>;
    verify(data: Account.Data, key: string, token: string): boolean;
    private getUpdateArgs;
    private getFindArgs;
    private getSortArgs;
}
