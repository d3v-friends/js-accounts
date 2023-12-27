"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnJwt = void 0;
var _js_pure_1 = require("@js-pure");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function create(p, secret) {
    return jsonwebtoken_1.default.sign(p, secret, {
        algorithm: "HS512",
    });
}
function verify(token, secret) {
    if (token)
        throw new _js_pure_1.JsError("token is empty", {}, {
            ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
        });
    try {
        var res = jsonwebtoken_1.default.verify(token, secret);
        if (!res)
            throw new Error();
        return res;
    }
    catch (e) {
        throw new _js_pure_1.JsError("invalid session token", {}, {
            ko: "로그인 정보가 변경되었습니다. 다시 로그인 하여 주십시오.",
        });
    }
}
exports.fnJwt = {
    create: create,
    verify: verify,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmMvand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUE2QztBQUM3Qyw4REFBK0I7QUFFL0IsU0FBUyxNQUFNLENBQWtDLENBQVUsRUFBRSxNQUFjO0lBQ3ZFLE9BQU8sc0JBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRTtRQUN2QixTQUFTLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxNQUFNLENBQWtDLEtBQWEsRUFBRSxNQUFjO0lBQzFFLElBQUksS0FBSztRQUFFLE1BQU0sSUFBSSxrQkFBTyxDQUN4QixnQkFBZ0IsRUFDaEIsRUFBRSxFQUNGO1lBQ0ksRUFBRSxFQUFFLCtCQUErQjtTQUN0QyxDQUFDLENBQUM7SUFFUCxJQUFJLENBQUM7UUFDRCxJQUFNLEdBQUcsR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFzQixDQUFDO1FBQzNELElBQUksQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDVCxNQUFNLElBQUksa0JBQU8sQ0FDYix1QkFBdUIsRUFDdkIsRUFBRSxFQUNGO1lBQ0ksRUFBRSxFQUFFLGtDQUFrQztTQUN6QyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUVZLFFBQUEsS0FBSyxHQUFHO0lBQ2pCLE1BQU0sUUFBQTtJQUNOLE1BQU0sUUFBQTtDQUNULENBQUMifQ==