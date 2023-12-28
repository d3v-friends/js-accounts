"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var _js_mongo_1 = require("@js-mongo");
var _js_pure_1 = require("@js-pure");
var mongoose_1 = require("mongoose");
var func_1 = require("../func");
var otplib_1 = require("otplib");
var default_1 = /** @class */ (function () {
    function default_1(colNm) {
        if (colNm === void 0) { colNm = "accounts"; }
        this.migrate = [];
        this.schema = new mongoose_1.Schema({
            isActivate: {
                type: Boolean,
                required: true,
                index: 1,
            },
            identifier: {
                type: mongoose_1.Schema.Types.Mixed,
            },
            property: {
                type: mongoose_1.Schema.Types.Mixed,
            },
            verifier: {
                type: mongoose_1.Schema.Types.Mixed,
            },
        }, {
            timestamps: true,
        });
        this.colNm = colNm;
    }
    default_1.prototype.model = function (conn) {
        return conn.model(this.colNm, this.schema);
    };
    default_1.prototype.create = function (model, _a) {
        var identifier = _a.identifier, property = _a.property, verifier = _a.verifier;
        return __awaiter(this, void 0, void 0, function () {
            var now, account;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = new Date();
                        account = {
                            _id: new mongoose_1.Types.ObjectId(),
                            isActivate: func_1.fnEnvLoader.signUpActivate(),
                            identifier: identifier,
                            property: property,
                            verifier: verifier,
                            createdAt: now,
                            updatedAt: now,
                        };
                        return [4 /*yield*/, model.create(account)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    default_1.prototype.updateOne = function (model, f, u) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.getFindArgs(f);
                        update = this.getUpdateArgs(u);
                        return [4 /*yield*/, model.updateOne(filter, update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findOne(model, f)];
                }
            });
        });
    };
    default_1.prototype.updateMany = function (model, f, u) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = this.getFindArgs(f);
                        update = this.getUpdateArgs(u);
                        return [4 /*yield*/, model.updateMany(filter, update)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.findAll(model, f)];
                }
            });
        });
    };
    default_1.prototype.findOne = function (model, f) {
        var sorts = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            sorts[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, _js_mongo_1.fnMongo.findOne(model, filter, sort)];
            });
        });
    };
    default_1.prototype.findAll = function (model, f) {
        var sorts = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            sorts[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, _js_mongo_1.fnMongo.findAll(model, filter, sort)];
            });
        });
    };
    default_1.prototype.findList = function (model, f, p) {
        var sorts = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            sorts[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var filter, sort;
            return __generator(this, function (_a) {
                filter = this.getFindArgs(f);
                sort = this.getSortArgs(sorts);
                return [2 /*return*/, _js_mongo_1.fnMongo.findList(model, filter, p, sort)];
            });
        });
    };
    default_1.prototype.verify = function (data, key, token) {
        if (!data.verifier.hasOwnProperty(key)) {
            throw new _js_pure_1.JsError("not found verifier", { key: key }, {
                ko: "서버에러! 관리자에게 문의하여 주십시오.",
            });
        }
        var verifier = data.verifier[key];
        switch (verifier.mode) {
            case "compare":
                return verifier.value === token;
            case "otp":
                return otplib_1.authenticator.verify({
                    token: token,
                    secret: verifier.key,
                });
            default:
                throw new _js_pure_1.JsError("invalid verify mode", {
                    mode: verifier.mode,
                }, {
                    ko: "서버에러! 관리자에게 문의하여 주십시오.",
                });
        }
    };
    default_1.prototype.reindex = function (conn, _a) {
        var identifier = _a.identifier, property = _a.property;
        return __awaiter(this, void 0, void 0, function () {
            var _i, identifier_1, key, field, _b, property_1, key, field;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.schema.clearIndexes();
                        return [4 /*yield*/, conn.model(this.colNm, this.schema).syncIndexes()];
                    case 1:
                        _e.sent();
                        this.schema.index({ isActivate: 1 });
                        if (identifier) {
                            for (_i = 0, identifier_1 = identifier; _i < identifier_1.length; _i++) {
                                key = identifier_1[_i];
                                field = (_c = {},
                                    _c["identifier.".concat(key)] = 1,
                                    _c);
                                this.schema.index(field, { unique: true });
                            }
                        }
                        if (property) {
                            for (_b = 0, property_1 = property; _b < property_1.length; _b++) {
                                key = property_1[_b];
                                field = (_d = {},
                                    _d["property.".concat(key)] = 1,
                                    _d);
                                this.schema.index(field, { unique: true });
                            }
                        }
                        return [4 /*yield*/, conn.model(this.colNm, this.schema).syncIndexes()];
                    case 2:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.getIndexList = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var ls, res, _i, ls_1, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.listIndexes()];
                    case 1:
                        ls = (_a.sent());
                        res = {
                            identifier: [],
                            property: [],
                            other: [],
                        };
                        for (_i = 0, ls_1 = ls; _i < ls_1.length; _i++) {
                            idx = ls_1[_i];
                            if (idx.name.startsWith("identifier")) {
                                res.identifier.push(idx.name);
                                continue;
                            }
                            if (idx.name.startsWith("property")) {
                                res.property.push(idx.name);
                                continue;
                            }
                            res.other.push(idx.name);
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    default_1.prototype.getUpdateArgs = function (_a) {
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
    default_1.prototype.getFindArgs = function (_a) {
        var id = _a.id, identifier = _a.identifier, property = _a.property, createdAt = _a.createdAt, updatedAt = _a.updatedAt;
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
        return res;
    };
    default_1.prototype.getSortArgs = function (sorts) {
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
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=account.js.map