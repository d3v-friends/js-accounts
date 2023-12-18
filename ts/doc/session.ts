import { Schema } from "@js-mongo";
import { fnErr } from "@js-pure";
import { Nullable } from "@js-pure/ts/type";
import Env from "@src/env";
import jwt from "jsonwebtoken";
import { SessionType as Typ, AccountType } from "@src/type";
import { Collection, Db, ObjectId } from "mongodb";

const colNm = "sessions";

const fn = {
    col: (db: Db): Collection<Typ.Data> => db.collection(colNm),
    create: async (db: Db, { accountId, ip, userAgent }: Typ.CreateArgs): Promise<Typ.SessionToken> => {
        const now = new Date();
        const session: Typ.Data = {
            _id: new ObjectId(),
            accountId,
            isActivate: true,
            createdAt: now,
            lastSignAt: now,
        };
        await fn.col(db).insertOne(session);
        return fnJwt.create({
            sessionId: session._id.toHexString(),
            signAt: now.toISOString(),
            ip,
            userAgent,
        });
    },
    verify: async (db: Db, { token, ip, userAgent }: Typ.VerifyArgs): Promise<AccountType.Data> => {
        const payload = fnJwt.verify(token);
        if (!payload) {
            throw new fnErr.Error(fnErr.msg("invalid session token"), {
                ko: "세션이 만료되었습니다. 다시 로그인 하여 주십시오.",
            });
        }

        if (Env.checkIp()) {
            if (payload.ip !== ip) {
                throw new fnErr.Error(fnErr.msg("changed ip", {
                    origin: payload.ip,
                    received: ip,
                }), {
                    ko: "접속 아이피가 변경되었습니다. 다시 로그인 하여 주십시오.",
                });
            }
        }

        if (Env.checkUserAgent()) {
            if (payload.userAgent !== userAgent) {
                throw new fnErr.Error(fnErr.msg("changed userAgent", {
                    origin: payload.userAgent,
                    received: userAgent,
                }), {
                    ko: "접속 기기가 변경되었습니다. 다시 로그인 하여 주십시오.",
                });
            }
        }

        if (!ObjectId.isValid(payload.sessionId)) {
            throw new fnErr.Error(fnErr.msg(`invalid sessionId: sessionId=${payload.sessionId}`), {
                ko: "잘못된 로그인 정보 입니다. 다시 로그인 하여 주십시오.",
            });
        }

        const sessionId = ObjectId.createFromHexString(payload.sessionId);
        const cur = fn.col(db).aggregate<Typ.Data & { account: AccountType.Data }>([
            {
                $match: {
                    _id: sessionId,
                    isActivate: true,
                },
            },
            {
                $limit: 1,
            },
            {
                $lookUp: {
                    from: "accounts",
                    as: "account",
                    foreignField: "_id",
                    localField: "accountId",
                },
            },
            {
                $addFields: {
                    account: {
                        $elemArrayAt: ["$$account", 0],
                    },
                },
            },
        ]);

        const res = await cur.next();
        if (!res) {
            throw new fnErr.Error(fnErr.msg("not found session"), {
                ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
            });
        }

        await fn.col(db).updateOne(
            {
                _id: sessionId,
            },
            {
                $set: {
                    lastSignAt: new Date(),
                },
            });

        return res.account;
    },
    delete: async (db: Db, { token }: Typ.DeleteArgs): Promise<void> => {
        const payload = fnJwt.verify(token);
        if (!payload) return;
        if (ObjectId.isValid(payload.sessionId)) return;

        await fn.col(db).deleteOne({
            _id: ObjectId.createFromHexString(payload.sessionId),
        });
        return;
    },
};

type Payload = {
    sessionId: string;
    signAt: string;
    ip?: string;
    userAgent?: string;
}

const fnJwt = {
    err: new fnErr.Error("invalid session token", {
        ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
    }),
    create: (payload: Payload): Typ.SessionToken => {
        const secret = Env.jwtSecret();
        return jwt.sign(payload, secret, {
            algorithm: "HS512",
        });
    },
    verify: (token: string): Payload => {
        if (!token) throw fnJwt.err;
        try {
            const res = jwt.verify(token, Env.jwtSecret()) as Nullable<Payload>;
            if (!res) throw new Error("fail decode token");
            return res;
        } catch (e) {
            throw new fnErr.Error(fnErr.msg("invalid session token", {
                err: e,
            }), fnJwt.err.msg);
        }
    },
};

const doc: Schema<Typ.Data> & typeof fn = {
    colNm,
    migrate: [
        async col => {
            await col.createIndexes([
                {
                    key: {
                        isActivate: 1,
                    },
                },
                {
                    key: {
                        ip: 1,
                    },
                },
                {
                    key: {
                        createdAt: -1,
                    },
                },
                {
                    key: {
                        updatedAt: -1,
                    },
                },
            ]);
        },
    ],
    ...fn,
};

export default doc;
