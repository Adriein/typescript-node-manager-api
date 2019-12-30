"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var ModelAttributes_1 = __importDefault(require("./ModelAttributes"));
var UserLocalSync_1 = __importDefault(require("../../repositories/UserLocalSync"));
var Model_1 = __importDefault(require("./Model"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.buildUser = function (attrs) {
        return new User(new ModelAttributes_1.default(attrs), new UserLocalSync_1.default());
    };
    User.prototype.exists = function () {
        return this.get("email") ? true : false;
    };
    return User;
}(Model_1.default));
exports.default = User;
