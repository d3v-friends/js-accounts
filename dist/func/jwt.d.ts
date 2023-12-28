declare function create<PAYLOAD extends string | object>(p: PAYLOAD, secret: string): string;
declare function verify<PAYLOAD extends string | object>(token: string, secret: string): PAYLOAD;
declare const _default: {
    create: typeof create;
    verify: typeof verify;
};
export default _default;
