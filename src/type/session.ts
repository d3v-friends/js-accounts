import { Bool, DateQuery } from "@js-mongo";
import { Types } from "mongoose";

export interface Session {
    _id: Types.ObjectId;
    accountId: Types.ObjectId;
    isActivate: boolean;
    ip: string;
    userAgent: string;
    lastSignAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type Token = string;

export interface FindArgs {
    id: Types.ObjectId[];
    isActivate: Bool;
    ip: string;
    userAgent: string;
    createdAt: DateQuery;
    lastSignAt: DateQuery;
}

export interface CreateArgs {
    accountId: Types.ObjectId;
    ip: string;
    userAgent: string;
}

export interface DeleteArgs {
    token: Token;
}

export interface VerifyArgs {
    token: Token;
    ip: string;
    userAgent: string;
}

export interface Payload {
    sessionId: string;
    signAt: string;
    userAgent?: string;
}
