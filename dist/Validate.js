"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var isString_1 = __importDefault(require("lodash/isString"));
/**
 * Base class for validation
 */
var Validate = /** @class */ (function () {
    function Validate() {
        this.required = false;
        this.stack = [];
    }
    Validate.prototype.sameAsFatory = function (otherKey) {
        var _this = this;
        var validator = function (data, key) {
            if (!isString_1.default(length)) {
                throw new Error('Incorrect/no `key` provided while declaring schema with `.sameAs`.');
            }
            var value = data[key];
            var otherValue = data[otherKey];
            var error = false;
            var message = '';
            if (!isEqual_1.default(value, otherValue)) {
                if (_this.required) {
                    error = true;
                    message = "The value of " + key + " should be same as " + otherKey;
                }
            }
            return {
                error: error,
                message: message,
            };
        };
        return validator;
    };
    /**
     * @inheritdoc
     */
    Validate.prototype.sameAs = function (key) {
        this.stack.push(this.sameAsFatory(key));
        return this;
    };
    /**
     * @inheritdoc
     */
    Validate.prototype.isRequired = function () {
        this.required = true;
        return this;
    };
    return Validate;
}());
exports.default = Validate;
//# sourceMappingURL=Validate.js.map