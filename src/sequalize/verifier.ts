import { UUID } from "@src/type";
import { Model, Optional, DataTypes, Sequelize } from "sequelize";

type VerifierAttribute = {
    id: UUID;
    accountId: UUID;
    kind: string;
    key: string;
    value: string;
    mode: VerifierMode;
    createdAt: Date;
    updatedAt: Date;
}

export type VerifierMode = "COMPARE" | "OTP";

type VerifierCreateAttribute = Optional<VerifierAttribute, "id">;


class Verifier extends Model<VerifierAttribute, VerifierCreateAttribute> {
    declare id: UUID;
    declare accountId: UUID;
    declare kind: string;
    declare key: string;
    declare value: string;
    declare mode: VerifierMode;
    declare createdAt: Date;
    declare updatedAt: Date;
}

export function initVerifier(sequelize: Sequelize, modelName = "verifiers") {
    Verifier.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        kind: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName,
        indexes: [
            {
                fields: ["accountId", "kind"],
                unique: true,
            },
        ],
    });
}
