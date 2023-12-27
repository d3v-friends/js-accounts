var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { fnMongo, Manager } from "@js-mongo";
import { fnParam, JsError } from "@js-pure";
import { Error, Schema, Types } from "mongoose";
import { fnEnvLoader } from "../func";
import { authenticator } from "otplib";
var AccountManager = /** @class */ (function (_super) {
    __extends(AccountManager, _super);
    function AccountManager() {
        var colNms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colNms[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.migrate = [];
        _this.schema = new Schema({
            isActivate: {
                type: Boolean,
                required: true,
            },
            identifier: {
                type: Types.Map,
            },
            property: {
                type: Types.Map,
            },
            verifier: {
                type: Types.Map,
            },
        }, {
            timestamps: true,
        });
        _this.colNm = fnParam.string(colNms, "accounts");
        return _this;
    }
    AccountManager.prototype.create = function (conn, _a) {
        var identifier = _a.identifier, property = _a.property, verifier = _a.verifier;
        return __awaiter(this, void 0, void 0, function () {
            var now, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = new Date();
                        account = {
                            _id: new Types.ObjectId(),
                            isActivate: fnEnvLoader.signUpActivate(),
                            identifier: identifier,
                            property: property,
                            verifier: verifier,
                            createdAt: now,
                            updatedAt: now,
                        };
                        return [4 /*yield*/, this.model(conn).create(account)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    AccountManager.prototype.updateOne = function (conn, f, u) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.getFindArgs(f);
                        update = this.getUpdateArgs(u);
                        return [4 /*yield*/, this.model(conn).updateOne(filter, update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findOne(conn, f)];
                }
            });
        });
    };
    AccountManager.prototype.updateMany = function (conn, f, u) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.getFindArgs(f);
                        update = this.getUpdateArgs(u);
                        return [4 /*yield*/, this.model(conn).updateMany(filter, update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findAll(conn, f)];
                }
            });
        });
    };
    AccountManager.prototype.findOne = function (conn, f) {
        var sorts = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            sorts[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, fnMongo.findOne(this.model(conn), filter, sort)];
            });
        });
    };
    AccountManager.prototype.findAll = function (conn, f) {
        var sorts = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            sorts[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, fnMongo.findAll(this.model(conn), filter, sort)];
            });
        });
    };
    AccountManager.prototype.findList = function (conn, f, p) {
        var sorts = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            sorts[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, fnMongo.findList(this.model(conn), filter, p, sort)];
            });
        });
    };
    AccountManager.prototype.index = function (conn, _a) {
        var identifier = _a.identifier, property = _a.property;
        return __awaiter(this, void 0, void 0, function () {
            var col;
            return __generator(this, function (_b) {
                col = this.model(conn);
                throw new Error("not impl");
            });
        });
    };
    AccountManager.prototype.verify = function (data, key, token) {
        if (!data.verifier.hasOwnProperty(key)) {
            throw new JsError("not found verifier", { key: key }, {
                ko: "서버에러! 관리자에게 문의하여 주십시오.",
            });
        }
        var verifier = data.verifier[key];
        switch (verifier.mode) {
            case "compare":
                return verifier.value === token;
            case "otp":
                return authenticator.verify({
                    token: token,
                    secret: verifier.key,
                });
            default:
                throw new JsError("invalid verify mode", {
                    mode: verifier.mode,
                }, {
                    ko: "서버에러! 관리자에게 문의하여 주십시오.",
                });
        }
    };
    AccountManager.prototype.getUpdateArgs = function (_a) {
        var isActivate = _a.isActivate, identifier = _a.identifier, property = _a.property, verifier = _a.verifier;
        var set = {
            updatedAt: new Date(),
        };
        if (isActivate) {
            set["isActivate"] = isActivate === "true";
        }
        if (identifier) {
            for (var key in identifier) {
                set["identifier.".concat(key)] = identifier[key];
            }
        }
        if (property) {
            for (var key in property) {
                set["property.".concat(key)] = property[key];
            }
        }
        if (verifier) {
            for (var key in verifier) {
                set["verifier.".concat(key)] = verifier[key];
            }
        }
        return {
            $set: set,
        };
    };
    AccountManager.prototype.getFindArgs = function (_a) {
        var id = _a.id, identifier = _a.identifier, property = _a.property, createdAt = _a.createdAt, updatedAt = _a.updatedAt, query = _a.query;
        var res = {};
        if (id) {
            res["_id"] = {
                $in: id,
            };
        }
        if (identifier) {
            for (var key in identifier) {
                res["identifier.".concat(key)] = identifier[key];
            }
        }
        if (property) {
            for (var key in property) {
                res["property.".concat(key)] = property[key];
            }
        }
        if (createdAt) {
            res["createdAt"] = createdAt;
        }
        if (updatedAt) {
            res["updatedAt"] = updatedAt;
        }
        if (query) {
            res = __assign(__assign({}, res), query);
        }
        return res;
    };
    AccountManager.prototype.getSortArgs = function (sorts) {
        if (sorts.length === 0)
            return {};
        var _a = sorts[0], id = _a.id, identifier = _a.identifier, property = _a.property, createdAt = _a.createdAt, updatedAt = _a.updatedAt;
        var res = {};
        if (id) {
            res["_id"] = id;
        }
        if (identifier) {
            for (var key in identifier) {
                res["identifier.".concat(key)] = identifier[key];
            }
        }
        if (property) {
            for (var key in property) {
                res["property.".concat(key)] = property[key];
            }
        }
        if (createdAt) {
            res["createdAt"] = createdAt;
        }
        if (updatedAt) {
            res["updatedAt"] = updatedAt;
        }
        return res;
    };
    return AccountManager;
}(Manager));
export { AccountManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2MvYWNjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFxQixNQUFNLFdBQVcsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQWMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBR3ZDO0lBQW9DLGtDQUFxQjtJQXdCckQ7UUFBWSxnQkFBbUI7YUFBbkIsVUFBbUIsRUFBbkIscUJBQW1CLEVBQW5CLElBQW1CO1lBQW5CLDJCQUFtQjs7UUFDM0IsWUFBQSxNQUFLLFdBQUUsU0FBQztRQXhCSSxhQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsWUFBTSxHQUFHLElBQUksTUFBTSxDQUMvQjtZQUNJLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUc7YUFDbEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHO2FBQ2xCO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRzthQUNsQjtTQUNKLEVBQ0Q7WUFDSSxVQUFVLEVBQUUsSUFBSTtTQUNuQixDQUNKLENBQUM7UUFJRSxLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENB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