"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModelAttributes_1 = __importDefault(require("./ModelAttributes"));
var UserLocalSync_1 = __importDefault(require("../../repositories/UserLocalSync"));
var User = /** @class */ (function () {
    function User(attrs) {
        this.attributes = new ModelAttributes_1.default(attrs);
        this.sync = new UserLocalSync_1.default();
    }
    Object.defineProperty(User.prototype, "get", {
        get: function () {
            return this.attributes.get;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.set = function (data) {
        this.attributes.set(data);
    };
    User.prototype.findOneBy = function (searchParams) {
        return this.sync.findOneBy(searchParams);
    };
    User.prototype.findAll = function () {
        return this.sync.findAll;
    };
    User.prototype.save = function (user) {
        return this.sync.save(user);
    };
    return User;
}());
exports.default = User;
