import { fnEnv } from "@js-pure";

const Env = {
    jwtSecret: () => fnEnv.string("JWT_SECRET", "123e4567-e89b-12d3-a456-426614174000"),
    signUpActivate: () => fnEnv.boolean("SIGN_UP_ACTIVATE", true),
    checkIp: () => fnEnv.boolean("CHECK_IP", false),
    checkUserAgent: () => fnEnv.boolean("CHECK_USERAGENT", false),
};

export default Env;
