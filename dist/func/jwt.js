"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _js_pure_1 = require("@js-pure");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function create(p, secret) {
    return jsonwebtoken_1.default.sign(p, secret, {
        algorithm: "HS512",
    });
}
function verify(token, secret) {
    if (token) {
        throw new _js_pure_1.JsError("token is empty", {}, {
            ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
        });
    }
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
exports.default = {
    create: create,
    verify: verify,
};
//# sourceMappingURL=jwt.js.map