import { UUID } from "@src/type";
import { Model, Optional, DataTypes, Sequelize } from "sequelize";

type AccountAttribute = {
    id: UUID;
    isActivate: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type AccountCreateAttribute = Optional<AccountAttribute, "id">;

export class Account extends Model<AccountAttribute, AccountCreateAttribute> {
    declare id: UUID;
    declare isActivate: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

export function initAccount(sequelize: Sequelize, modelName = "accounts") {
    Account.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        isActivate: {
            type: DataTypes.BOOLEAN,
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
    });
}



interface Property {
    id: UUID;
    accountId: UUID;
    key: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Verifier {
    id: UUID;
    accountId: UUID;
    kind: string;
    key: string;
    value: string;
    mode: string;
    createdAt: Date;
    updatedAt: Date;
}
