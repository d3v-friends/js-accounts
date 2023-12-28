/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
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
import { Manager, Pager, ResultList, FnMigrate } from "@js-mongo";
import { Connection, Model, Schema, Types } from "mongoose";
import { Account, CreateArgs, FindArgs, IndexArgs, IndexName, SortArgs, UpdateArgs } from "../type/account";
export default class implements Manager<Account> {
    readonly colNm: string;
    readonly migrate: FnMigrate<Account>[];
    readonly schema: Schema<Account, Model<Account, any, any, any, import("mongoose").Document<unknown, any, Account> & Account & Required<{
        _id: Types.ObjectId;
    }>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Account>> & import("mongoose").FlatRecord<Account> & Required<{
        _id: Types.ObjectId;
    }>>;
    constructor(colNm?: string);
    model(conn: Connection): Model<Account>;
    create(model: Model<Account>, { identifier, property, verifier }: CreateArgs): Promise<Account>;
    updateOne(model: Model<Account>, f: FindArgs, u: Partial<UpdateArgs>): Promise<Account>;
    updateMany(model: Model<Account>, f: FindArgs, u: Partial<UpdateArgs>): Promise<Account[]>;
    findOne(model: Model<Account>, f: FindArgs, ...sorts: SortArgs[]): Promise<Account>;
    findAll(model: Model<Account>, f: FindArgs, ...sorts: SortArgs[]): Promise<Account[]>;
    findList(model: Model<Account>, f: FindArgs, p: Pager, ...sorts: SortArgs[]): Promise<ResultList<Account>>;
    verify(data: Account, key: string, token: string): boolean;
    reindex(conn: Connection, { identifier, property }: Partial<IndexArgs>): Promise<void>;
    getIndexList(model: Model<Account>): Promise<IndexName>;
    private getUpdateArgs;
    private getFindArgs;
    private getSortArgs;
}
