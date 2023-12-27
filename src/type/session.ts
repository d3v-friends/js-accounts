import { Bool, DateQuery } from "@js-mongo";
import { Types } from "mongoose";


export interface Data {
    _id: Types.ObjectId;
    accountId: Types.ObjectId;
    isActivate: boolean;
    property: SessionProperty;
    lastSignAt: Date;
}

export type Token = string;

export type SessionPropertyKey = "ip" | "userAgent" | string;
export type SessionProperty = Record<SessionPropertyKey, string>

export type FindArgs = Partial<{
    id: Types.ObjectId[],
    isActivate: Bool,
    property: SessionProperty,
    createdAt: DateQuery,
    lastSignAt: DateQuery,
}>

export type CreateArgs = {
    accountId: Types.ObjectId,
    ip: string,
    userAgent: string,
}

export type DeleteArgs = {
    token: Token
}

export type VerifyArgs = {
    token: Token;
    ip: string;
    userAgent: string;
}

export type Payload = {
    sessionId: string;
    signAt: string;
    userAgent?: string;
}
