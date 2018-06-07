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
var Validate_1 = __importDefault(require("./Validate"));
// export interface IValidateEnum extends IOneOf, IOneOfType {
//     oneOf(types: any[]): IValidateEnum;
//     oneOfType(types: Function[]): IValidateEnum;
// }
var ValidateEnum = /** @class */ (function (_super) {
    __extends(ValidateEnum, _super);
    function ValidateEnum() {
        return _super.call(this) || this;
    }
    ValidateEnum.prototype.oneOfFactory = function (types) {
        var validator = function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (!types.includes(value)) {
                error = true;
                message = "enum mismatch";
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    ValidateEnum.prototype.oneOfTypeFactory = function (types) {
        var validator = function (data, key) {
            var value = data[key];
            var match = types.some(function (validatorFn) {
                var err = validatorFn(data, key).error;
                return !err;
            });
            var error = !match;
            var message = error ? 'Failed to match' : '';
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