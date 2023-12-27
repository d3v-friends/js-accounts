"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2Mvc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFDOUMsa0RBQWtEO0FBQ2xELCtDQUErQztBQUMvQywwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLEVBQUU7QUFDRiw4REFBOEQ7QUFDOUQscUNBQXFDO0FBQ3JDLDBEQUEwRDtBQUMxRCxFQUFFO0FBQ0YsVUFBVTtBQUNWLDBEQUEwRDtBQUMxRCxFQUFFO0FBQ0YseUNBQXlDO0FBQ3pDLG1CQUFtQjtBQUNuQiwyREFBMkQ7QUFDM0QsMkJBQTJCO0FBQzNCLDZCQUE2QjtBQUM3QiwwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLHNCQUFzQjtBQUN0QiwwQ0FBMEM7QUFDMUMsNkJBQTZCO0FBQzdCLHNCQUFzQjtBQUN0QiwwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLHNCQUFzQjtBQUN0QiwwQ0FBMEM7QUFDMUMscUNBQXFDO0FBQ3JDLHNCQUFzQjtBQUN0QixpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFFBQVE7QUFDUixFQUFFO0FBQ0YsOEdBQThHO0FBQzlHLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6QixnQ0FBZ0M7QUFDaEMsMEJBQTBCO0FBQzFCLHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCLDhCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiLEVBQUU7QUFDRixFQUFFO0FBQ0YsOENBQThDO0FBQzlDLGdEQUFnRDtBQUNoRCxnQkFBZ0I7QUFDaEIsa0RBQWtEO0FBQ2xELDZDQUE2QztBQUM3Qyw2QkFBNkI7QUFDN0IsaUJBQWlCO0FBQ2pCLHVDQUF1QztBQUN2QyxhQUFhO0FBQ2IsUUFBUTtBQUNSLEVBQUU7QUFDRix5R0FBeUc7QUFDekcseUZB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