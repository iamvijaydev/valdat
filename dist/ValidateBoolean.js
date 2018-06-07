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
var isBoolean_1 = __importDefault(require("lodash/isBoolean"));
var Validate_1 = __importDefault(require("./Validate"));
var ValidateBoolean = /** @class */ (function (_super) {
    __extends(ValidateBoolean, _super);
    function ValidateBoolean() {
        return _super.call(this) || this;
    }
    ValidateBoolean.prototype.booleanFatory = function () {
        var _this = this;
        var validator = function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (value === null) {
                if (_this.required) {
                    error = true;
                    message = key + " is required, but its value is undefined.";
                }
            }
            else if (!isBoolean_1.default(value)) {
                error = true;
                message = key + " should be boolean, recieved " + typeof value + ".";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateBoolean.prototype.boolean = function () {
        this.stack.push(this.booleanFatory());
        return this;
    };
    return ValidateBoolean;
}(Validate_1.default));
exports.default = ValidateBoolean;
//# sourceMappingURL=ValidateBoolean.js.map