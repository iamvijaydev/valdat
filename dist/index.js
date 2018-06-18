"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var Validate_1 = __importDefault(require("./Validate"));
exports.Validate = Validate_1.default;
var ValidateString_1 = __importDefault(require("./ValidateString"));
var ValidateNumber_1 = __importDefault(require("./ValidateNumber"));
var ValidateBoolean_1 = __importDefault(require("./ValidateBoolean"));
var ValidateObject_1 = __importDefault(require("./ValidateObject"));
var ValidateArray_1 = __importDefault(require("./ValidateArray"));
var ValidateEnum_1 = __importDefault(require("./ValidateEnum"));
var valdat = {
    check: function (schema, data) {
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
    },
    register: function (name, method) {
        if (!name) {
            throw new Error('Register expects to be called with a name.');
        }
        if (!isFunction_1.default(method)) {
            throw new Error('Register expects the method to be function.');
        }
        valdat[name] = method;
        return valdat[name];
    },
    custom: function (validator) {
        if (!isFunction_1.default(validator)) {
            throw new Error('Custom expects the validator to be function.');
        }
        return { stack: [validator] };
    },
    string: function () { return new ValidateString_1.default().string(); },
    number: function () { return new ValidateNumber_1.default().number(); },
    boolean: function () { return new ValidateBoolean_1.default().boolean(); },
    object: function () { return new ValidateObject_1.default().object(); },
    array: function () { return new ValidateArray_1.default().array(); },
    oneOf: function (types) { return new ValidateEnum_1.default().oneOf(types); },
    oneOfType: function (types) { return new ValidateEnum_1.default().oneOfType(types); },
};
exports.default = valdat;
//# sourceMappingURL=index.js.map