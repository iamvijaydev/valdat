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
var isObject_1 = __importDefault(require("lodash/isObject"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateObject = /** @class */ (function (_super) {
    __extends(ValidateObject, _super);
    function ValidateObject() {
        return _super.call(this) || this;
    }
    ValidateObject.prototype.objectFatory = function () {
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
            else if (isObject_1.default(value)) {
                error = true;
                message = key + " should be an object, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateObject.prototype.shapeFactory = function (shape) {
        var validator = function (data, key) {
            if (!isObject_1.default(shape)) {
                throw new Error('Incorrect/no `shape` value provided while declaring schema with `object().shape`.');
            }
            var value = data[key];
            var error = false;
            var message = '';
            var matchFailed = Object.keys(shape)
                .some(function (shapeKey) {
                var validatorFn = shape[shapeKey];
                var err = validatorFn(value, shapeKey).error;
                return err;
            });
            if (matchFailed) {
                error = true;
                message = "The data object does not match the schema shape";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateObject.prototype.object = function () {
        this.stack.push(this.objectFatory());
        return this;
    };
    ValidateObject.prototype.shape = function (shape) {
        this.stack.push(this.shapeFactory(shape));
        return this;
    };
    return ValidateObject;
}(Validate_1.default));
exports.default = ValidateObject;
//# sourceMappingURL=ValidateObject.js.map