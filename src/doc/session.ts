import { Manager } from "@js-mongo";
import { JsError } from "@js-pure";
import { fnEnvLoader, fnJwt } from "@src/func";
import { Account } from "@src/type/account";
import { CreateArgs, Payload, Session, Token, VerifyArgs } from "../type/session";
import { Connection, Model, Schema, Types } from "mongoose";

export default class implements Manager<Session> {
    public readonly colNm: string;
    public readonly migrate = [];
    public readonly schema = new Schema<Session>(
        {
            accountId: {
                type: Schema.Types.ObjectId,
                required: true,
                index: -1,
            },
            isActivate: {
                type: Boolean,
                required: true,
            },
            ip: {
                type: String,
                index: 1,
            },
            userAgent: {
                type: String,
                index: 1,
            },
            lastSignAt: {
                type: Date,
                required: true,
                index: -1,
            },
        },
        {
            timestamps: true,
        }
    );

    constructor(colNm = "sessions") {
        this.colNm = colNm;
    }

    public model(conn: Connection): Model<Session> {
        return conn.model(this.colNm, this.schema);
    }

    public async create(model: Model<Session>, { accountId, ip, userAgent }: CreateArgs): Promise<Token> {
        const now = new Date();
        const session: Session = {
            _id: new Types.ObjectId(),
            accountId,
            ip,
            isActivate: true,
            userAgent,
            lastSignAt: now,
            createdAt: now,
            updatedAt: now,
        };

        await model.create(session);

        return fnJwt.create<Payload>(
            {
                sessionId: session._id.toHexString(),
                signAt: now.toISOString(),
            },
            fnEnvLoader.jwtSecret()
        );
    }

    public async verify(model: Model<Session>, { token, ip, userAgent }: VerifyArgs): Promise<Account> {
        const payload = fnJwt.verify<Payload>(token, fnEnvLoader.jwtSecret());
        const sessionId = Types.ObjectId.createFromHexString(payload.sessionId);
        if (!sessionId) {
            throw new JsError(
                "invalid sessionId",
                { payload },
                {
                    ko: "로그인 실패. 다시 시도하여 주십시오.",
                }
            );
        }

        const res = await model.aggregate<Session & { account: Account }>([
            {
                $match: {
                    _id: sessionId,
                    isActivate: true,
                },
            },
            {
                $lookup: {
                    as: "account",
                    from: "accounts",
                    localField: "accountId",
                    foreignField: "_id",
                },
            },
            {
                $addFields: {
                    account: {
                        $arrayElemAt: ["$account", 0],
                    },
                },
            },
        ]);

        if (res.length === 0) {
            throw new JsError(
                "not found session",
                {
                    payload,
                },
                {
                    ko: "로그인 정보가 없습니다. 다시 시도하여 주십시오.",
                }
            );
        }

        const session = res[0];

        if (fnEnvLoader.checkIp()) {
            if (ip !== session.ip) {
                throw new JsError(
                    "invalid ip",
                    {
                        sessionIp: session.ip,
                        connIp: ip,
                    },
                    {
                        ko: "접속 IP가 변경 되었습니다. 다시 로그인 하여 주십시오.",
                    }
                );
            }
        }

        if (fnEnvLoader.checkUserAgent()) {
            if (userAgent !== session.userAgent) {
                throw new JsError(
                    "changed userAgent",
                    {
                        session: session.userAgent,
                        conn: userAgent,
                    },
                    {
                        ko: "접속 기기가 변경되었습니다. 다시 로그인 하여 주십시오.",
                    }
                );
            }
        }

        await model.updateOne(
            {
                _id: sessionId,
                isActivate: true,
            },
            {
                $set: {
                    lastSignAt: new Date(),
                },
            }
        );

        return session.account;
    }
}
