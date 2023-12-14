import { JsError } from "@d3v-friends/js-pure/fnError";

type Key = "failDropIndexes" | "findFilterIsNull" | "notFoundAccount"
const onError: Record<Key, JsError> = {
    failDropIndexes: new JsError("fail drop indexes", {
        ko: "유저 인덱스 초기화에 실패하였습니다.",
    }),
    findFilterIsNull: new JsError("find filter is null", {
        ko: "검색 조건이 없습니다.",
    }),
    notFoundAccount: new JsError("not found account", {
        ko: "계정이 없습니다.",
    }),
};


export default onError;
