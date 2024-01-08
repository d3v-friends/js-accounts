import { Sequelize } from "sequelize";
export type VerifierMode = "COMPARE" | "OTP";
export declare function initVerifier(sequelize: Sequelize, modelName?: string): void;
