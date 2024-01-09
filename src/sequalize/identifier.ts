import { Account } from "@src/sequalize/account";
import { UUID } from "@src/type";
import { Model, Optional, DataTypes, Sequelize } from "sequelize";

export type IdentifierAttribute = {
    id: UUID;
    accountId: UUID;
    kind: string;
    value: string;
    createdAt: Date;
}

type IdentifierCreateAttribute = Optional<IdentifierAttribute, "id">;


export class Identifier extends Model<IdentifierAttribute, IdentifierCreateAttribute> {
    declare id: UUID;
    declare accountId: UUID;
    declare kind: string;
    declare value: string;
    declare createdAt: Date;
}

export function initIdentifier(sequelize: Sequelize, modelName = "identifiers") {
    Identifier.init({
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
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName,
        indexes: [
            {
                fields: ["accountId"],
            },
            {
                fields: ["kind", "value"],
                unique: true,
            },
        ],
    });
}
