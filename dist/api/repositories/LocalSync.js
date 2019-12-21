"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = __importDefault(require("../database/Database"));
var LocalSync = /** @class */ (function () {
    function LocalSync() {
        this.db = Database_1.default.getInstance();
    }
    return LocalSync;
}());
exports.default = LocalSync;
