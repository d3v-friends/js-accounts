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
import { Manager } from "@js-mongo";
import { CreateArgs, Session, Token } from "../type/session";
import { Connection, Model, Schema, Types } from "mongoose";
export default class implements Manager<Session> {
    readonly colNm: string;
    readonly migrate: never[];
    readonly schema: Schema<Session, Model<Session, any, any, any, import("mongoose").Document<unknown, any, Session> & Session & Required<{
        _id: Types.ObjectId;
    }>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Session, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Session>> & import("mongoose").FlatRecord<Session> & Required<{
        _id: Types.ObjectId;
    }>>;
    constructor(colNm?: string);
    model(conn: Connection): Model<Session>;
    create(model: Model<Session>, { accountId, ip, userAgent }: CreateArgs): Promise<Token>;
}
