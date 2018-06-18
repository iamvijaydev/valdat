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
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateNumber = /** @class */ (function (_super) {
    __extends(ValidateNumber, _super);
    function ValidateNumber() {
        return _super.call(this) || this;
    }
    ValidateNumber.prototype.numberFatory = function () {
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
            else if (isNumber_1.default(value)) {
                error = true;
                message = key + " should be number, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateNumber.prototype.minFatory = function (min) {
        var validator = function (data, key) {
            if (!isNumber_1.default(min)) {
                throw new Error('Incorrect/no `min` value provided while declaring schema with `number().min`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (!isNumber_1.default(value)) {
                error = true;
                message = key + " should be a number to compare with min";
            }
            else if (value < min) {
                error = true;
                message = key + " should be greater than or equal to " + min + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateNumber.prototype.maxFatory = function (max) {
        var validator = function (data, key) {
            if (!isNumber_1.default(max)) {
                throw new Error('Incorrect/no `max` value provided while declaring schema with `number().max`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            if (!isNumber_1.default(value)) {
                error = true;
                message = key + " should be a number to compare with max";
            }
            else if (value > max) {
                error = true;
                message = key + " should be less than or equal to " + max + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateNumber.prototype.number = function () {
        this.stack.push(this.numberFatory());
        return this;
    };
    ValidateNumber.prototype.min = function (min) {
        this.stack.push(this.minFatory(min));
        return this;
    };
    ValidateNumber.prototype.max = function (max) {
        this.stack.push(this.maxFatory(max));
        return this;
    };
    return ValidateNumber;
}(Validate_1.default));
exports.default = ValidateNumber;
//# sourceMappingURL=ValidateNumber.js.map