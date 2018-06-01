"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Valdat_1 = __importDefault(require("./Valdat"));
exports.default = Valdat_1.default;
var ValidateString_1 = __importDefault(require("./ValidateString"));
var ValidateNumber_1 = __importDefault(require("./ValidateNumber"));
var ValidateEnum_1 = __importDefault(require("./ValidateEnum"));
Valdat_1.default.register('string', function () { return new ValidateString_1.default().string; });
Valdat_1.default.register('number', function () { return new ValidateNumber_1.default().number; });
Valdat_1.default.register('oneOf', function () { return new ValidateEnum_1.default().oneOf; });
Valdat_1.default.register('oneOfType', function () { return new ValidateEnum_1.default().oneOfType; });
//# sourceMappingURL=index.js.map