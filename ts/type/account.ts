import { ObjectId } from "mongodb";

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
