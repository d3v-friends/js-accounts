import { UUID } from "@src/type";
import { Model, Optional, DataTypes, Sequelize } from "sequelize";

export type PropertyAttribute = {
    id: UUID;
    accountId: UUID;
    key: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

type PropertyCreateAttribute = Optional<PropertyAttribute, "id">;


export class Property extends Model<PropertyAttribute, PropertyCreateAttribute> {
    declare id: UUID;
    declare accountId: UUID;
    declare key: string;
    declare value: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

export function initProperty(sequelize: Sequelize, modelName = "properties") {
    Property.init({
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
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
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
                fields: ["accountId", "key"],
                unique: true,
            },
        ],
    });
}
