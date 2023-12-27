import { JsError, Nullable } from "@js-pure";
import jwt from "jsonwebtoken";

function create<PAYLOAD extends string | object>(p: PAYLOAD, secret: string): string {
    return jwt.sign(p, secret, {
        algorithm: "HS512",
    });
}

function verify<PAYLOAD extends string | object>(token: string, secret: string): PAYLOAD {
    if (token) throw new JsError(
        "token is empty",
        {},
        {
            ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
        });

    try {
        const res = jwt.verify(token, secret) as Nullable<PAYLOAD>;
        if (!res) throw new Error();
        return res;
    } catch (e) {
        throw new JsError(
            "invalid session token",
            {},
            {
                ko: "로그인 정보가 변경되었습니다. 다시 로그인 하여 주십시오.",
            });
    }
}

export const fnJwt = {
    create,
    verify,
};

