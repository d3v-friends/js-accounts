import { faker } from "@faker-js/faker";
import { CreateArgs } from "@src/type/account";
import { CreateArgs as CreateSessionArgs } from "@src/type/session";
import { Types } from "mongoose";

export const fnTest = {
    createAccountArgs: (): CreateArgs => ({
        identifier: {
            username: faker.internet.userName(),
        },
        property: {
            nickname: faker.animal.dog(),
        },
        verifier: {
            password: {
                key: "salt",
                value: "saltedPassword",
                mode: "compare",
            },
        },
    }),
    createSessionArgs: ({ accountId }: { accountId: Types.ObjectId }): CreateSessionArgs => ({
        accountId,
        ip: faker.internet.ipv4(),
        userAgent: faker.internet.userAgent(),
    }),
};
