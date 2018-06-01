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
var isArray_1 = __importDefault(require("lodash/isArray"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateArray = /** @class */ (function (_super) {
    __extends(ValidateArray, _super);
    function ValidateArray() {
        return _super.call(this) || this;
    }
    ValidateArray.prototype.arrayFatory = function () {
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
            else if (isArray_1.default(value)) {
                error = true;
                message = key + " should be an array, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
    };
    ValidateArray.prototype.notEmptyFactory = function () {
        return function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (!value.length) {
                error = true;
                message = key + " cannot be an empty array.";
            }
            return {
                error: error,
                message: message,
            };
        };
    };
    ValidateArray.prototype.ofFactory = function (type) {
        return function (data, key) {
            var value = data[key];
            var match = value.some(function (item) {
                var err = type({ check: item }, 'check').error;
                return !err;
            });
            var error = type(data, key);
            var message = error ? 'Failed to match' : '';
            return {
                error: error,
                message: message,
            };
        };
    };
    ValidateArray.prototype.array = function () {
        this.stack.push(this.arrayFatory());
        return this;
    };
    ValidateArray.prototype.notEmpty = function () {
        this.stack.push(this.notEmptyFactory());
        return this;
    };
    ValidateArray.prototype.of = function (type) {
        this.stack.push(this.ofFactory(type));
        return this;
    };
    return ValidateArray;
}(Validate_1.default));
exports.default = ValidateArray;
//# sourceMappingURL=ValidateArray.js.map