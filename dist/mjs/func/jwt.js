import { JsError } from "@js-pure";
import jwt from "jsonwebtoken";
function create(p, secret) {
    return jwt.sign(p, secret, {
        algorithm: "HS512",
    });
}
function verify(token, secret) {
    if (token)
        throw new JsError("token is empty", {}, {
            ko: "로그인 정보가 없습니다. 다시 로그인 하여 주십시오.",
        });
    try {
        var res = jwt.verify(token, secret);
        if (!res)
            throw new Error();
        return res;
    }
    catch (e) {
        throw new JsError("invalid session token", {}, {
            ko: "로그인 정보가 변경되었습니다. 다시 로그인 하여 주십시오.",
        });
    }
}
export var fnJwt = {
    create: create,
    verify: verify,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmMvand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQVksTUFBTSxVQUFVLENBQUM7QUFDN0MsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBRS9CLFNBQVMsTUFBTSxDQUFrQyxDQUFVLEVBQUUsTUFBYztJQUN2RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRTtRQUN2QixTQUFTLEVBQUUsT0FBTztLQUNyQixDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxNQUFNLENBQWtDLEtBQWEsRUFBRSxNQUFjO0lBQzFFLElBQUksS0FBSztRQUFFLE1BQU0sSUFBSSxPQUFPLENBQ3hCLGdCQUFnQixFQUNoQixFQUFFLEVBQ0Y7WUFDSSxFQUFFLEVBQUUsK0JBQStCO1NBQ3RDLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQztRQUNELElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBc0IsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRztZQUFFLE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1QsTUFBTSxJQUFJLE9BQU8sQ0FDYix1QkFBdUIsRUFDdkIsRUFBRSxFQUNGO1lBQ0ksRUFBRSxFQUFFLGtDQUFrQztTQUN6QyxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRztJQUNqQixNQUFNLFFBQUE7SUFDTixNQUFNLFFBQUE7Q0FDVCxDQUFDIn0=