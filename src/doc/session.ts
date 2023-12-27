import { Manager } from "@js-mongo";
import { fnParam } from "@js-pure";
import { Session } from "@src/type";
import { Schema, Types } from "mongoose";

export class SessionManager extends Manager<Session> {
    public readonly colNm: string;
    public readonly migrate = [];
    public readonly schema = new Schema<Session.Data>({
        accountId: {
            type: Types.ObjectId,
            required: true,
            index: -1,
        },
        isActivate: {
            type: Boolean,
            required: true,
        },
        property: {
            type: Types.Map,
        },
        lastSignAt: {
            type: Date,
            required: true,
            index: -1,
        },
    }, {
        timestamps: true,
    });

    constructor(...colNms: string[]) {
        super();
        this.colNm = fnParam.string(colNms, "sessions");
    }
}

// import { Schema } from "mongoose";
// import { fnEnvLoader, fnJwt } from "../func";
// import { Account, Session } from "../type";
// import { Manager, FnMigrate } from "@js-mongo";
// import { JsError, fnParam } from "@js-pure";
// import { Db, ObjectId } from "mongodb";
//
//
// export class SessionManager extends Manager<Session.Data> {
//     public readonly colNm: string;
//     public readonly schema = new Schema<Session.Data>({
//
//     });
//     public readonly migrate: FnMigrate<Session.Data>[];
//
//     constructor(...colNms: string[]) {
//         super();
//         this.colNm = fnParam.string(colNms, "sessions");
//         this.migrate = [
//             async col => {
//                 await col.createIndex({
//                     isActivate: 1,
//                 });
//                 await col.createIndex({
//                     ip: 1,
//                 });
//                 await col.createIndex({
//                     createdAt: -1,
//                 });
//                 await col.createIndex({
//                     updatedAt: -1,
//                 });
//             },
//         ];
//     }
//
//     public async create(db: Db, { accountId, ip, userAgent }: Session.CreateArgs): Promise<Session.Token> {
//         const now = new Date();
//         const v: Session.Data = {
//             _id: new ObjectId(),
//             accountId,
//             isActivate: true,
//             property: {
//                 ip,
//                 userAgent,
//             },
//             createdAt: now,
//             lastSignAt: now,
//         };
//
//
//         await this.getCol(db).insertOne(v);
//         return fnJwt.create<Session.Payload>(
//             {
//                 sessionId: v._id.toHexString(),
//                 signAt: now.toISOString(),
//                 userAgent,
//             },
//             fnEnvLoader.jwtSecret(),
//         );
//     }
//
//     public async verify(db: Db, { token, ip, userAgent }: Session.VerifyArgs): Promise<Account.Data> {
//         const payload: Session.Payload = fnJwt.verify(token, fnEnvLoader.jwtSecret());
//
//         if (!ObjectId.isValid(payload.sessionId)) {
//             throw new JsError(
//                 `invalid sessionId`,
//                 {},
//                 {
//                     ko: "잘못된 로그인 정보 입니다. 다시 로그인 하여 주십시오.",
//                 });
//         }
//
//         const sessionId = ObjectId.createFromHexString(payload.sessionId);
//         const cur = this.getCol(db).aggregate<Session.Data & { account: Account.Data }>([
//             {
//                 $match: {
//                     _id: sessionId,
//                     isActivate: true,
//                 },
//             },
//             {
//                 $limit: 1,
//             },
//             {
//                 $lookUp: {
//                     from: "accounts",
//                     as: "account",
//                     foreignField: "_id",
//                     localField: "accountId",
//                 },
//             },
//             {
//                 $addFields: {
//                     account: {
//                         $elemArrayAt: ["$$account", 0],
//                     },
//                 },
//             },
//         ]);
//
//         const res = await cur.next();
//         if (!res) {
//             throw new JsError(
//                 "not found session",
//                 {},
//                 {
//                     ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
//                 });
//         }
//
//         if (fnEnvLoader.checkIp()) {
//
//             if (ip !== res.property.ip) {
//                 throw new JsError(
//                     `unmatched userAgent`,
//                     {
//                         token: payload.userAgent,
//                         server: userAgent,
//                     },
//                     {
//                         ko: "접속 IP가 변경되었습니다. 다시 로그인 하여 주십시오.",
//                     });
//             }
//         }
//
//
//         if (fnEnvLoader.checkUserAgent()) {
//             if (userAgent !== res.property.userAgent) {
//                 throw new JsError(
//                     `unmatched userAgent`,
//                     {
//                         token: payload.userAgent,
//                         server: userAgent,
//                     },
//                     {
//                         ko: "접속기기가 변경되었습니다. 다시 로그인 하여 주십시오.",
//                     },
//                 );
//             }
//         }
//
//
//         await this.getCol(db).updateOne(
//             {
//                 _id: sessionId,
//             },
//             {
//                 $set: {
//                     lastSignAt: new Date(),
//                 },
//             });
//
//         return res.account;
//     }
//
//     public async delete(db: Db, f: Session.FindArgs): Promise<void> {
//         const filter = this.findArgs(f);
//         await this.getCol(db).deleteOne(filter);
//     }
//
//     private findArgs({ id, isActivate, lastSignAt, createdAt }: Session.FindArgs): object {
//         const res: any = {};
//         if (id) {
//             res["_id"] = {
//                 $in: id,
//             };
//         }
//
//         if (isActivate) {
//             res["isActivate"] = isActivate === "true";
//         }
//
//         if (lastSignAt) {
//             res["lastSignAt"] = lastSignAt;
//         }
//
//         if (createdAt) {
//             res["createdAt"] = createdAt;
//         }
//
//         return res;
//     }
//
// }
