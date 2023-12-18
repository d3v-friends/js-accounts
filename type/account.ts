import { DateQuery } from "@js-mongo/type";
import { IndexDirection, ObjectId } from "mongodb";

export type Data = {
    _id: ObjectId;
    isActivate: boolean,
    identifier: Map<string, string>,
    property: Map<string, string>,
    verifier: Map<string, Verifier>
    createdAt: Date,
    updatedAt: Date,
}

export type Verifier = {
    key: string,
    value: string,
    mode: VerifierMode,
}

export type VerifierMode = "password" | "otp";

export type CreateArgs = {
    identifier: Map<string, string>,
    property: Map<string, string>,
}

export type UpdateArgs = Partial<{
    property: Map<string, string>;
    verifier: Map<string, Verifier>;
}>

export type ReplaceArgs = {
    isActivate: boolean,
}

export type FindArgs = Partial<{
    id: ObjectId[],
    identifier: Map<string, string>,
    property: Map<string, string>,
    createdAt: DateQuery,
    updatedAt: DateQuery,
}>

export type SortArgs = Partial<{
    id: IndexDirection,
    identifier: Map<string, IndexDirection>,
    property: Map<string, IndexDirection>,
    createdAt: IndexDirection,
    updatedAt: IndexDirection,
}>
