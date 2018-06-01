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
    return Validate;
}());
exports.default = Validate;
//# sourceMappingURL=Validate.js.map