"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var Valdat = {};
exports.default = Valdat;
Valdat.check = function (schema, data) {
    if (schema === void 0) { schema = {}; }
    if (data === void 0) { data = {}; }
    var isValid = true;
    var errors = {};
    Object.keys(schema)
        .forEach(function (key) {
        var stack = schema[key].stack;
        for (var i = 0, j = stack.length; i < j; i++) {
            var test_1 = stack[i];
            var _a = test_1(data, key), error = _a.error, message = _a.message;
            if (error) {
                isValid = false;
                errors[key] = message;
                break;
            }
        }
    });
    return {
        isValid: isValid,
        errors: errors
    };
};
Valdat.register = function (name, method) {
    if (!name) {
        throw new Error('Register expects to be called with a name.');
    }
    if (!isFunction_1.default(method)) {
        throw new Error('Register expects the method to be function.');
    }
    Valdat[name] = method;
};
//# sourceMappingURL=Valdat.js.map