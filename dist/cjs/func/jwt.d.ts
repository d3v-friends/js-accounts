declare function create<PAYLOAD extends string | object>(p: PAYLOAD, secret: string): string;
declare function verify<PAYLOAD extends string | object>(token: string, secret: string): PAYLOAD;
export declare const fnJwt: {
    create: typeof create;
    verify: typeof verify;
};
export {};
