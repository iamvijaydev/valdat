"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidateString_1 = require("./ValidateString");
var Valdat = {};
exports.default = Valdat;
Valdat.check = function (schema, data) {
    var isValid = true;
    var errors = {};
    Object.keys(schema)
        .forEach(function (key) {
        var stack = schema[key].stack;
        for (var i = 0, j = stack.length; i < j; i++) {
            var test = stack[i];
            var _a = test(data, key), error = _a.error, message = _a.message;
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
    Valdat[name] = method;
};
Valdat.register('string', function () { return new ValidateString_1.default().string(); });
//# sourceMappingURL=index.js.map