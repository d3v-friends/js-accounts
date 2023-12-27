import { fnEnv } from "@js-pure";

// 일부러 매번 환경변수를 불러오는 형식으로 작성함
// -> 상수로 지정시, 프로그램 자체가 언제 환경변수가 초기화 되는지 알수 없을떄가 있어 언제나 undefined 로 나올수 있다.
// -> 많은 연산을 거치지 않긴 하지만, 효율성이 떨어지는 부분이 될수도 있다.

const EnvKey = {
    jwtSecret: "JWT_SECRET",
    signUpActivate: "SIGN_UP_ACTIVATE",
    checkIp: "CHECK_IP",
    checkUserAgent: "CHECK_USERAGENT",
};

export const fnEnvLoader = {
    jwtSecret: () => fnEnv.string(EnvKey.jwtSecret, "123e4567-e89b-12d3-a456-426614174000"),
    signUpActivate: () => fnEnv.boolean(EnvKey.signUpActivate, true),
    checkIp: () => fnEnv.boolean(EnvKey.checkIp, false),
    checkUserAgent: () => fnEnv.boolean(EnvKey.checkUserAgent, false),
};
