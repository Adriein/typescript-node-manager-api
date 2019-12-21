"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = __importDefault(require("../database/Database"));
var GenericRepo = /** @class */ (function () {
    function GenericRepo() {
        this.db = new Database_1.default();
    }
    return GenericRepo;
}());
exports.default = GenericRepo;
