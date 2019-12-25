"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelAttributes = /** @class */ (function () {
    function ModelAttributes(data) {
        var _this = this;
        this.data = data;
        this.get = function (propName) {
            return _this.data[propName];
        };
    }
    ModelAttributes.prototype.set = function (update) {
        Object.assign(this.data, update);
    };
    ModelAttributes.prototype.getAll = function () {
        return this.data;
    };
    return ModelAttributes;
}());
exports.default = ModelAttributes;
