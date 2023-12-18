import { DateQuery } from "@js-mongo/ts/type";
import { ObjectId } from "mongodb";

export type Data = {
    _id: ObjectId;
    isActivate: boolean;
    accountId: ObjectId;
    createdAt: Date;
    lastSignAt: Date;
}

export type FindArgs = Partial<{
    id: ObjectId[],
    isActivate: boolean,
    createdAt: DateQuery,
    lastSignAt: DateQuery,
}>

export type CreateArgs = {
    accountId: ObjectId,
    ip?: string,
    userAgent?: string,
}

export type DeleteArgs = {
    token: SessionToken
}

export type SessionToken = string;

export type VerifyArgs = {
    token: SessionToken;
    ip?: string;
    userAgent?: string;
}
