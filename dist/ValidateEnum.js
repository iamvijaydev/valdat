"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isUndefined_1 = __importDefault(require("lodash/isUndefined"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var isFunction_1 = __importDefault(require("lodash/isFunction"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateEnum = /** @class */ (function (_super) {
    __extends(ValidateEnum, _super);
    function ValidateEnum() {
        return _super.call(this) || this;
    }
    ValidateEnum.prototype.oneOfFactory = function (types) {
        var _this = this;
        var validator = function (data, key) {
            if (!isArray_1.default(types)) {
                throw new Error('Incorrect/no `types` value provided while declaring schema with `oneOf`.');
            }
            else if (types.length) {
                throw new Error('Empty array `types` is not allowed while declaring schema with `oneOf`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (isUndefined_1.default(value)) {
                if (_this.required) {
                    error = true;
                    message = key + " is required, but its value is undefined.";
                }
            }
            else if (!types.includes(value)) {
                error = true;
                message = "The current value " + key + ": " + value + ", is not not allowed";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateEnum.prototype.oneOfTypeFactory = function (types) {
        var _this = this;
        var validator = function (data, key) {
            if (!isArray_1.default(types)) {
                throw new Error('Incorrect/no `types` value provided while declaring schema with `oneOfType`.');
            }
            else if (types.length) {
                throw new Error('Empty array `types` is not allowed while declaring schema with `oneOfType`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (isUndefined_1.default(value)) {
                if (_this.required) {
                    error = true;
                    message = key + " is required, but its value is undefined.";
                }
            }
            else {
                var match = types.some(function (validatorFn, index) {
                    if (!isFunction_1.default(validatorFn)) {
                        throw new Error("Incorrect `validatorFn` found at " + index + " of `types` in schema with `oneOfType`.");
                    }
                    var err = validatorFn(data, key).error;
                    return !err;
                });
                error = !match;
                message = error ? "The current value " + key + " is not not allowed" : '';
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateEnum.prototype.oneOf = function (types) {
        this.stack.push(this.oneOfFactory(types));
        return this;
    };
    ValidateEnum.prototype.oneOfType = function (types) {
        this.stack.push(this.oneOfTypeFactory(types));
        return this;
    };
    return ValidateEnum;
}(Validate_1.default));
exports.default = ValidateEnum;
//# sourceMappingURL=ValidateEnum.js.map