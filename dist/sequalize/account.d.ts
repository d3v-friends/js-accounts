import { UUID } from "@src/type";
import { Model, Optional, Sequelize } from "sequelize";
type AccountAttribute = {
    id: UUID;
    isActivate: boolean;
    createdAt: Date;
    updatedAt: Date;
};
type AccountCreateAttribute = Optional<AccountAttribute, "id">;
export declare class Account extends Model<AccountAttribute, AccountCreateAttribute> {
    id: UUID;
    isActivate: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare function initAccount(sequelize: Sequelize, modelName?: string): void;
export {};
