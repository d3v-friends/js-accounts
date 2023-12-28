/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/indexes" />
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
import { DateQuery, Bool } from "@js-mongo";
import { IndexDirection, Types } from "mongoose";
export interface Account {
    _id: Types.ObjectId;
    isActivate: boolean;
    identifier: {
        [key: string]: string;
    };
    property: {
        [key: string]: PropertyValue;
    };
    verifier: {
        [key: string]: Verifier;
    };
    createdAt: Date;
    updatedAt: Date;
}
export type PropertyValue = string | number | Date;
export interface Verifier {
    key: string;
    value: string;
    mode: VerifierMode;
}
export type VerifierMode = "compare" | "otp";
export interface CreateArgs {
    identifier: {
        [key: string]: string;
    };
    property: {
        [key: string]: PropertyValue;
    };
    verifier: {
        [key: string]: Verifier;
    };
}
export interface UpdateArgs {
    isActivate: Bool;
    identifier: {
        [key: string]: string;
    };
    property: {
        [key: string]: PropertyValue;
    };
    verifier: {
        [key: string]: Verifier;
    };
}
export type FindArgs = Partial<{
    id: Types.ObjectId[];
    identifier: {
        [key: string]: string;
    };
    property: {
        [key: string]: PropertyValue;
    };
    createdAt: DateQuery;
    updatedAt: DateQuery;
}>;
export type SortArgs = Partial<{
    id: IndexDirection;
    identifier: {
        [key: string]: IndexDirection;
    };
    property: {
        [key: string]: IndexDirection;
    };
    createdAt: IndexDirection;
    updatedAt: IndexDirection;
}>;
export interface IndexArgs {
    identifier: string[];
    property: string[];
}
export interface IndexName {
    identifier: string[];
    property: string[];
    other: string[];
}
