"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVerifier = void 0;
var sequelize_1 = require("sequelize");
var Verifier = /** @class */ (function (_super) {
    __extends(Verifier, _super);
    function Verifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Verifier;
}(sequelize_1.Model));
function initVerifier(sequelize, modelName) {
    if (modelName === void 0) { modelName = "verifiers"; }
    Verifier.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        accountId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
        },
        kind: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        mode: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize: sequelize,
        modelName: modelName,
        indexes: [
            {
                fields: ["accountId", "kind"],
                unique: true,
            },
        ],
    });
}
exports.initVerifier = initVerifier;
//# sourceMappingURL=verifier.js.map