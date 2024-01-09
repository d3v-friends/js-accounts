import { Identifier, IdentifierAttribute } from "@src/sequalize/identifier";
import { Property, PropertyAttribute } from "@src/sequalize/property";
import { Verifier, VerifierAttribute } from "@src/sequalize/verifier";
import { AnyMap, Bool, NewUUID, StrMap, UUID, VerifierMap } from "@src/type";
import { Model, Optional, DataTypes, Sequelize } from "sequelize";

type AccountAttribute = {
    id: UUID;
    isActivate: Bool;
    createdAt: Date;
    updatedAt: Date;
}

type AccountCreateAttribute = Optional<AccountAttribute, "id">;

export class Account extends Model<AccountAttribute, AccountCreateAttribute> {
    declare id: UUID;
    declare isActivate: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;

    public static async createAccount(seq: Sequelize, {
        identifier,
        property,
        verifier,
    }: CreateAccountArgs): Promise<Account> {
        return seq.transaction(async transaction => {
            const now = new Date();
            const account = await Account.create({
                id: NewUUID(),
                isActivate: "true",
                createdAt: now,
                updatedAt: now,
            }, { transaction });

            const ids: IdentifierAttribute[] = [];
            for (const kind in identifier) {
                ids.push({
                    id: NewUUID(),
                    accountId: account.id,
                    kind,
                    value: identifier[kind],
                    createdAt: now,
                });
            }
            await Identifier.bulkCreate(ids, { transaction });

            const props: PropertyAttribute[] = [];
            for (const key in property) {
                props.push({
                    id: NewUUID(),
                    accountId: account.id,
                    key,
                    value: JSON.stringify(property[key]),
                    createdAt: now,
                    updatedAt: now,
                });
            }
            await Property.bulkCreate(props, { transaction });

            const vers: VerifierAttribute[] = [];
            for (const kind in verifier) {
                vers.push({
                    id: NewUUID(),
                    accountId: account.id,
                    kind,
                    key: verifier[kind].key,
                    value: verifier[kind].value,
                    mode: verifier[kind].mode,
                    createdAt: now,
                    updatedAt: now,
                });
            }
            await Verifier.bulkCreate(vers, { transaction });

            return account;
        });
    }
}

export interface CreateAccountArgs {
    identifier: StrMap;
    property: AnyMap;
    verifier: VerifierMap;
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
    });
}


