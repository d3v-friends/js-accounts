import { fnMongo, Manager, Pager, ResultList, MongooseIndex, FnMigrate } from "@js-mongo";
import { JsError } from "@js-pure";
import { Connection, Error, Model, Schema, Types } from "mongoose";
import { Account, CreateArgs, FindArgs, IndexArgs, IndexName, SortArgs, UpdateArgs } from "../type/account";
import { fnEnvLoader } from "../func";
import { authenticator } from "otplib";

export default class implements Manager<Account> {
    public readonly colNm: string;
    public readonly migrate: FnMigrate<Account>[] = [];
    public readonly schema = new Schema<Account>(
        {
            isActivate: {
                type: Boolean,
                required: true,
                index: 1,
            },
            identifier: {
                type: Schema.Types.Mixed,
            },
            property: {
                type: Schema.Types.Mixed,
            },
            verifier: {
                type: Schema.Types.Mixed,
            },
        },
        {
            timestamps: true,
        }
    );

    constructor(colNm = "accounts") {
        this.colNm = colNm;
    }

    public model(conn: Connection): Model<Account> {
        return conn.model(this.colNm, this.schema);
    }

    public async create(model: Model<Account>, { identifier, property, verifier }: CreateArgs): Promise<Account> {
        const now = new Date();
        const account: Account = {
            _id: new Types.ObjectId(),
            isActivate: fnEnvLoader.signUpActivate(),
            identifier,
            property,
            verifier,
            createdAt: now,
            updatedAt: now,
        };
        await model.create(account);
        return account;
    }

    public async updateOne(model: Model<Account>, f: FindArgs, u: Partial<UpdateArgs>): Promise<Account> {
        const filter = this.getFindArgs(f);
        const update = this.getUpdateArgs(u);
        await model.updateOne(filter, update);
        return this.findOne(model, f);
    }

    public async updateMany(model: Model<Account>, f: FindArgs, u: Partial<UpdateArgs>): Promise<Account[]> {
        const filter = this.getFindArgs(f);
        const update = this.getUpdateArgs(u);
        await model.updateMany(filter, update);
        return this.findAll(model, f);
    }

    public async findOne(model: Model<Account>, f: FindArgs, ...sorts: SortArgs[]): Promise<Account> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findOne(model, filter, sort);
    }

    public async findAll(model: Model<Account>, f: FindArgs, ...sorts: SortArgs[]): Promise<Account[]> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findAll(model, filter, sort);
    }

    public async findList(model: Model<Account>, f: FindArgs, p: Pager, ...sorts: SortArgs[]): Promise<ResultList<Account>> {
        const filter = this.getFindArgs(f);
        const sort = this.getSortArgs(sorts);
        return fnMongo.findList(model, filter, p, sort);
    }

    public verify(data: Account, key: string, token: string): boolean {
        if (!data.verifier.hasOwnProperty(key)) {
            throw new JsError(
                "not found verifier",
                { key },
                {
                    ko: "서버에러! 관리자에게 문의하여 주십시오.",
                }
            );
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
                    },
                    {
                        ko: "서버에러! 관리자에게 문의하여 주십시오.",
                    }
                );
        }
    }

    public async reindex(conn: Connection, { identifier, property }: Partial<IndexArgs>): Promise<void> {
        this.schema.clearIndexes();
        await conn.model(this.colNm, this.schema).syncIndexes();

        this.schema.index({ isActivate: 1 });
        if (identifier) {
            for (const key of identifier) {
                const field: any = {
                    [`identifier.${key}`]: 1,
                };
                this.schema.index(field, { unique: true });
            }
        }

        if (property) {
            for (const key of property) {
                const field: any = {
                    [`property.${key}`]: 1,
                };
                this.schema.index(field, { unique: true });
            }
        }

        await conn.model(this.colNm, this.schema).syncIndexes();
    }

    public async getIndexList(model: Model<Account>): Promise<IndexName> {
        const ls = (await model.listIndexes()) as MongooseIndex[];
        const res: IndexName = {
            identifier: [],
            property: [],
            other: [],
        };
        for (const idx of ls) {
            if (idx.name.startsWith("identifier")) {
                res.identifier.push(idx.name);
                continue;
            }

            if (idx.name.startsWith("property")) {
                res.property.push(idx.name);
                continue;
            }

            res.other.push(idx.name);
        }

        return res;
    }

    private getUpdateArgs({ isActivate, identifier, property, verifier }: Partial<UpdateArgs>): object {
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

    private getFindArgs({ id, identifier, property, createdAt, updatedAt }: Partial<FindArgs>): object {
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

        return res;
    }

    private getSortArgs(sorts: SortArgs[]): object {
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
