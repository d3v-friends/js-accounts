import { ObjectId } from "mongodb";
export type Account = {
    _id: ObjectId;
    identifier: Map<string, string>;
    property: Map<string, string>;
    verifier: Map<VerifierKey, AccountVerifier>;
    createdAt: Date;
    updatedAt: Date;
};
type AccountVerifier = {
    key: string;
    value: string;
};
type VerifierKey = "password" | "otp";
declare const MngAccount: {};
export default MngAccount;
