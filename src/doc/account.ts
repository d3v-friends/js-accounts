import { fnMongo, Manager, Pager, ResultList } from "@js-mongo";
import { fnParam, JsError } from "@js-pure";
import { Connection, Error, Schema, Types } from "mongoose";
import type { Account } from "@src/type";
import { fnEnvLoader } from "../func";
import { authenticator } from "otplib";


export class AccountManager extends Manager<Account.Data> {
    public readonly migrate = [];
    public readonly colNm: string;
    public readonly schema = new Schema<Account.Data>(
        {
            isActivate: {
                type: Boolean,
                required: true,
                index: 1,
            },
            identifier: {
                type: Types.Map,
            },
            property: {
                type: Types.Map,
            },
            verifier: {
                type: Types.Map,
            },
        },
        {
            timestamps: true,
        },
    );

    constructor(...colNms: string[]) {
        super();
        this.colNm = fnParam.string(colNms, "accounts");
    }

    public async create(conn: Connection, {
        identifier,
        property,
        verifier,
    }: Account.CreateArgs): Promise<Account.Data> {
        const now = new Date();
        const account: Account.Data = {
            _id: new Types.ObjectId(),
            isActivate: fnEnvLoader.signUpActivate(),
            identifier,
            property,
            verifier,
            createdAt: now,
            updatedAt: now,
        };
        await this.model(conn).create(account);
        return account;
    }

    public async updateOne(conn: Connection, f: Account.FindArgs, u: Account.UpdateArgs): Promise<Account.Data> {
        const filter = this.getFindArgs(f);
        const update = this.getUpdateArgs(u);
        await this.model(conn).updateOne(filter, update);
        return this.findOne(conn, f);
    }

    public async updateMany(conn: Connection, f: Account.FindArgs, u: Account.UpdateArgs): Promise<Account.Data[]> {
        const filter = this.getFindArgs(f);
        const update = this.getUpdateArgs(u);
        await this.model(conn).updateMany(filter, update);
        return this.findAll(conn, f);
    }

    public async findOne(conn: Connection, f: Account.FindArgs, ...sorts: Account.SortArgs[]): Promise<Account.Data> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findOne(this.model(conn), filter, sort);
    }

    public async findAll(conn: Connection, f: Account.FindArgs, ...sorts: Account.SortArgs[]): Promise<Account.Data[]> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findAll(this.model(conn), filter, sort);
    }

    public async findList(conn: Connection, f: Account.FindArgs, p: Pager, ...sorts: Account.SortArgs[]): Promise<ResultList<Account.Data>> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findList(this.model(conn), filter, p, sort);
    }

    public async index(conn: Connection, { identifier, property }: Account.IndexArgs): Promise<void> {
        const col = this.model(conn);
        throw new Error("not impl");
    }

    public verify(data: Account.Data, key: string, token: string): boolean {
        if (!data.verifier.hasOwnProperty(key)) {
            throw new JsError(
                "not found verifier",
                { key },
                {
                    ko: "서버에러! 관리자에게 문의하여 주십시오.",
                });
        }
        const verifier = data.verifier[key];

        switch (verifier.mode) {
            case "compare":
                return verifier.value === token;
            case "otp":
                return authenticator.verify({
                    token,
                    secret: verifier.key,
                });
            default:
                throw new JsError(
                    "invalid verify mode",
                    {
                        mode: verifier.mode,
                    }, {
                        ko: "서버에러! 관리자에게 문의하여 주십시오.",
                    });
        }
    }

    private getUpdateArgs({ isActivate, identifier, property, verifier }: Account.UpdateArgs): object {
        const set: any = {
            updatedAt: new Date(),
        };

        if (isActivate) {
            set["isActivate"] = isActivate === "true";
        }

        if (identifier) {
            for (let key in identifier) {
                set[`identifier.${key}`] = identifier[key];
            }
        }

        if (property) {
            for (let key in property) {
                set[`property.${key}`] = property[key];
            }
        }

        if (verifier) {
            for (let key in verifier) {
                set[`verifier.${key}`] = verifier[key];
            }
        }

        return {
            $set: set,
        };
    }

    private getFindArgs({ id, identifier, property, createdAt, updatedAt, query }: Account.FindArgs): object {
        let res: any = {};
        if (id) {
            res["_id"] = {
                $in: id,
            };
        }

        if (identifier) {
            for (let key in identifier) {
                res[`identifier.${key}`] = identifier[key];
            }
        }

        if (property) {
            for (let key in property) {
                res[`property.${key}`] = property[key];
            }
        }

        if (createdAt) {
            res["createdAt"] = createdAt;
        }

        if (updatedAt) {
            res["updatedAt"] = updatedAt;
        }

        if (query) {
            res = {
                ...res,
                ...query,
            };
        }

        return res;
    }

    private getSortArgs(sorts: Account.SortArgs[]): object {
        if (sorts.length === 0) return {};
        const { id, identifier, property, createdAt, updatedAt } = sorts[0];
        const res: any = {};
        if (id) {
            res["_id"] = id;
        }

        if (identifier) {
            for (let key in identifier) {
                res[`identifier.${key}`] = identifier[key];
            }
        }

        if (property) {
            for (let key in property) {
                res[`property.${key}`] = property[key];
            }
        }

        if (createdAt) {
            res["createdAt"] = createdAt;
        }

        if (updatedAt) {
            res["updatedAt"] = updatedAt;
        }

        return res;
    }

}
