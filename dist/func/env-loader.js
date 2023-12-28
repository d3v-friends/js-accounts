"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnEnvLoader = void 0;
var _js_pure_1 = require("@js-pure");
// 일부러 매번 환경변수를 불러오는 형식으로 작성함
// -> 상수로 지정시, 프로그램 자체가 언제 환경변수가 초기화 되는지 알수 없을떄가 있어 언제나 undefined 로 나올수 있다.
// -> 많은 연산을 거치지 않긴 하지만, 효율성이 떨어지는 부분이 될수도 있다.
var EnvKey = {
    jwtSecret: "JWT_SECRET",
    signUpActivate: "SIGN_UP_ACTIVATE",
    checkIp: "CHECK_IP",
    checkUserAgent: "CHECK_USERAGENT",
};
exports.fnEnvLoader = {
    jwtSecret: function () { return _js_pure_1.fnEnv.string(EnvKey.jwtSecret, "123e4567-e89b-12d3-a456-426614174000"); },
    signUpActivate: function () { return _js_pure_1.fnEnv.boolean(EnvKey.signUpActivate, true); },
    checkIp: function () { return _js_pure_1.fnEnv.boolean(EnvKey.checkIp, false); },
    checkUserAgent: function () { return _js_pure_1.fnEnv.boolean(EnvKey.checkUserAgent, false); },
};
//# sourceMappingURL=env-loader.js.map