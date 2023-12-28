import { DateQuery, Bool } from "@js-mongo";
import { IndexDirection, Types } from "mongoose";

export interface Account {
    _id: Types.ObjectId;
    isActivate: boolean;
    identifier: { [key: string]: string };
    property: { [key: string]: PropertyValue };
    verifier: { [key: string]: Verifier };
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
    identifier: { [key: string]: string };
    property: { [key: string]: PropertyValue };
    verifier: { [key: string]: Verifier };
}

export interface UpdateArgs {
    isActivate: Bool;
    identifier: { [key: string]: string };
    property: { [key: string]: PropertyValue };
    verifier: { [key: string]: Verifier };
}

export type FindArgs = Partial<{
    id: Types.ObjectId[],
    identifier: { [key: string]: string };
    property: { [key: string]: PropertyValue };
    createdAt: DateQuery,
    updatedAt: DateQuery,
}>

export type SortArgs = Partial<{
    id: IndexDirection,
    identifier: { [key: string]: IndexDirection };
    property: { [key: string]: IndexDirection };
    createdAt: IndexDirection,
    updatedAt: IndexDirection,
}>


export interface IndexArgs {
    identifier: string[],
    property: string[],
}

export interface IndexName {
    identifier: string[],
    property: string[],
    other: string[],
}
