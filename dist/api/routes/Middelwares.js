"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Middelwares = /** @class */ (function () {
    function Middelwares() {
    }
    Middelwares.prototype.requireAuth = function (req, res, next) {
        var _a, _b;
        if (!((_b = (_a = req) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.userId)) {
            return res.send("Forbidden");
        }
        next();
    };
    return Middelwares;
}());
exports.default = Middelwares;
