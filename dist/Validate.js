"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validate = /** @class */ (function () {
    function Validate() {
        this.required = false;
        this.stack = [];
    }
    Validate.prototype.isRequired = function () {
        this.required = true;
        return this;
    };
    Validate.prototype.enumFactory = function (items) {
        return function (data, key) {
            var value = data[key];
            var error = false;
            var message = '';
            if (!items.includes(value)) {
                error = true;
                message = "enum mismatch";
            }
            return {
                error: error,
                message: message,
            };
        };
    };
    Validate.prototype.enum = function (items) {
        if (!Array.isArray(items)) {
            throw new Error('enum items should be an array');
        }
        if (!items.length) {
            throw new Error('enum items should be provided.');
        }
        this.stack.push(this.enumFactory(items));
        return this;
    };
    return Validate;
}());
exports.default = Validate;
//# sourceMappingURL=Validate.js.map