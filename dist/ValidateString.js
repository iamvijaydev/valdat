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
Object.defineProperty(exports, "__esModule", { value: true });
var Validate_1 = require("./Validate");
var ValidateString = /** @class */ (function (_super) {
    __extends(ValidateString, _super);
    function ValidateString() {
        return _super.call(this) || this;
    }
    ValidateString.prototype.stringFatory = function () {
        var _this = this;
        return function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (value === null) {
                if (_this.required) {
                    error = true;
                    message = key + " is required, but its value is undefined.";
                }
            }
            else if (typeof value !== typeof '') {
                error = true;
                message = key + " should be string, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
    };
    ValidateString.prototype.hasLenFatory = function (length) {
        return function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (value.length !== length) {
                error = true;
                message = key + " should be of length " + length + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
    };
    ValidateString.prototype.regexFactory = function (regex) {
        return function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (!regex.test(value)) {
                error = true;
                message = key + " does not match the regex " + regex + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
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
        this.stack.push(this.regexFactory(regex));
        return this;
    };
    return ValidateString;
}(Validate_1.default));
exports.default = ValidateString;
//# sourceMappingURL=ValidateString.js.map