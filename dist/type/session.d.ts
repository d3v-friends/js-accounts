/// <reference types="mongoose/types/types" />
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
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
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
