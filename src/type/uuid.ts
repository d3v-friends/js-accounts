import { UUIDV4, AbstractDataType } from "sequelize";

export type UUID = AbstractDataType;

export function NewUUID(): UUID {
    return UUIDV4();
}
