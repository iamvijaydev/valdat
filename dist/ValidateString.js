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
var isString_1 = __importDefault(require("lodash/isString"));
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var isRegExp_1 = __importDefault(require("lodash/isRegExp"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateString = /** @class */ (function (_super) {
    __extends(ValidateString, _super);
    function ValidateString() {
        return _super.call(this) || this;
    }
    ValidateString.prototype.stringFatory = function () {
        var _this = this;
        var validator = function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (isUndefined_1.default(value)) {
                if (_this.required) {
                    error = true;
                    message = key + " is required, but its value is undefined.";
                }
            }
            else if (!isString_1.default(value)) {
                error = true;
                message = key + " should be string, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateString.prototype.hasLenFatory = function (length) {
        var validator = function (data, key) {
            if (!isNumber_1.default(length)) {
                throw new Error('Incorrect/no `length` provided while declaring schema with `string().hasLen`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (!isString_1.default(value)) {
                error = true;
                message = key + " should be a string to check it's length";
            }
            else if (value.length !== length) {
                error = true;
                message = key + " should be of length " + length + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateString.prototype.matchRegexFactory = function (regex) {
        var validator = function (data, key) {
            if (!isRegExp_1.default(regex)) {
                throw new Error('Incorrect/no `regex` provided while declaring schema with `string().matchRegex`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (!isString_1.default(value)) {
                error = true;
                message = key + " should be a string to match regex.";
            }
            else if (!regex.test(value)) {
                error = true;
                message = key + " does not match the regex " + regex + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateString.prototype.string = function () {
        this.stack.push(this.stringFatory());
        return this;
    };
    ValidateString.prototype.hasLen = function (length) {
        this.stack.push(this.hasLenFatory(length));
        return this;
    };
    ValidateString.prototype.matchRegex = function (regex) {
        this.stack.push(this.matchRegexFactory(regex));
        return this;
    };
    return ValidateString;
}(Validate_1.default));
exports.default = ValidateString;
//# sourceMappingURL=ValidateString.js.map