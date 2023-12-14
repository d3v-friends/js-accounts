import { describe, beforeAll, test, expect } from "@jest/globals";
import jsMongo from "@d3v-friends/js-mongo";
import { Db } from "mongodb";

describe("account", () => {
    let db: Db;
    beforeAll(async () => {
        db = jsMongo.connect({
            host: "",
            username: "",
            password: "",
            database: "",
        });
    });
});
