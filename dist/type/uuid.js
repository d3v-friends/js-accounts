"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewUUID = void 0;
var sequelize_1 = require("sequelize");
function NewUUID() {
    return (0, sequelize_1.UUIDV4)();
}
exports.NewUUID = NewUUID;
//# sourceMappingURL=uuid.js.map