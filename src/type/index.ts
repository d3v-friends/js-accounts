export * from "./uuid";

export type Bool = "true" | "false";
export type StrMap = { [key: string]: string };
export type AnyMap = { [key: string]: any };
export type VerifierMap = {
    [kind: string]: {
        key: string,
        value: string,
        mode: VerifierMode,
    }
};
export type VerifierMode = "COMPARE" | "OTP";
