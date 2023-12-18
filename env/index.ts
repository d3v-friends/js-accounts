import { fnEnv } from "@js-pure";

export const EnvKey = {
    jwtSecret: "JWT_SECRET",
    signUpActivate: "SIGN_UP_ACTIVATE",
    checkIp: "CHECK_IP",
    checkUserAgent: "CHECK_USERAGENT",
};

export const Env = {
    jwtSecret: () => fnEnv.string(EnvKey.jwtSecret, "123e4567-e89b-12d3-a456-426614174000"),
    signUpActivate: () => fnEnv.boolean(EnvKey.signUpActivate, true),
    checkIp: () => fnEnv.boolean(EnvKey.checkIp, false),
    checkUserAgent: () => fnEnv.boolean(EnvKey.checkUserAgent, false),
};
