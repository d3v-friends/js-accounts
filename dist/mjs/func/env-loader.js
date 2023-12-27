import { fnEnv } from "@js-pure";
// 일부러 매번 환경변수를 불러오는 형식으로 작성함
// -> 상수로 지정시, 프로그램 자체가 언제 환경변수가 초기화 되는지 알수 없을떄가 있어 언제나 undefined 로 나올수 있다.
// -> 많은 연산을 거치지 않긴 하지만, 효율성이 떨어지는 부분이 될수도 있다.
var EnvKey = {
    jwtSecret: "JWT_SECRET",
    signUpActivate: "SIGN_UP_ACTIVATE",
    checkIp: "CHECK_IP",
    checkUserAgent: "CHECK_USERAGENT",
};
export var fnEnvLoader = {
    jwtSecret: function () { return fnEnv.string(EnvKey.jwtSecret, "123e4567-e89b-12d3-a456-426614174000"); },
    signUpActivate: function () { return fnEnv.boolean(EnvKey.signUpActivate, true); },
    checkIp: function () { return fnEnv.boolean(EnvKey.checkIp, false); },
    checkUserAgent: function () { return fnEnv.boolean(EnvKey.checkUserAgent, false); },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mdW5jL2Vudi1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVqQyw2QkFBNkI7QUFDN0IsMkVBQTJFO0FBQzNFLDhDQUE4QztBQUU5QyxJQUFNLE1BQU0sR0FBRztJQUNYLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLGNBQWMsRUFBRSxrQkFBa0I7SUFDbEMsT0FBTyxFQUFFLFVBQVU7SUFDbkIsY0FBYyxFQUFFLGlCQUFpQjtDQUNwQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxjQUFNLE9BQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLHNDQUFzQyxDQUFDLEVBQXRFLENBQXNFO0lBQ3ZGLGNBQWMsRUFBRSxjQUFNLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUExQyxDQUEwQztJQUNoRSxPQUFPLEVBQUUsY0FBTSxPQUFBLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBcEMsQ0FBb0M7SUFDbkQsY0FBYyxFQUFFLGNBQU0sT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQTNDLENBQTJDO0NBQ3BFLENBQUMifQ==