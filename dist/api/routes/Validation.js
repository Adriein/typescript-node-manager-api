"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var crypto_1 = __importDefault(require("crypto"));
var util_1 = __importDefault(require("util"));
var User_1 = __importDefault(require("../domain/models/User"));
var Validation = /** @class */ (function () {
    function Validation() {
        this.scrypt = util_1.default.promisify(crypto_1.default.scrypt);
        this.user = User_1.default.buildUser({});
    }
    Object.defineProperty(Validation.prototype, "requireEmail", {
        get: function () {
            var _this = this;
            return express_validator_1.check("email")
                .trim()
                .normalizeEmail()
                .isEmail()
                .withMessage("Must be valid email")
                .custom(function (email) { return __awaiter(_this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.user.findOne({ table: 'user_profile', email: email })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 3];
                        case 3:
                            if (this.user.exists()) {
                                throw new Error("Email in use");
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validation.prototype, "requirePassword", {
        get: function () {
            return express_validator_1.check("pass")
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Password must be between 4 and 20 characters");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validation.prototype, "requireEmailExists", {
        get: function () {
            var _this = this;
            return express_validator_1.check("email")
                .trim()
                .normalizeEmail()
                .isEmail()
                .withMessage("Must provide a valid email")
                .custom(function (email) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.user.findOne({
                                table: 'user_profile',
                                email: email
                            })];
                        case 1:
                            _a.sent();
                            if (!this.user.exists()) {
                                throw new Error("Email not found");
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Validation.prototype, "requireValidPassword", {
        get: function () {
            var _this = this;
            return express_validator_1.check("password")
                .trim()
                .custom(function (password, _a) {
                var req = _a.req;
                return __awaiter(_this, void 0, void 0, function () {
                    var email;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                email = req.body.email;
                                return [4 /*yield*/, this.user.findOne({
                                        table: 'user_profile',
                                        email: email
                                    })];
                            case 1:
                                _c.sent();
                                return [4 /*yield*/, this.comparePassword(password, (_b = this.user) === null || _b === void 0 ? void 0 : _b.get("password"))];
                            case 2:
                                if (!(_c.sent())) {
                                    throw new Error("Invalid password");
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Validation.prototype.comparePassword = function (givenPassword, storedPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hashed, salt, hashedGiven;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = storedPassword.split("."), hashed = _a[0], salt = _a[1];
                        return [4 /*yield*/, this.scrypt(givenPassword, salt, 64)];
                    case 1:
                        hashedGiven = _b.sent();
                        return [2 /*return*/, hashedGiven.toString("hex") == hashed];
                }
            });
        });
    };
    Validation.prototype.encryptPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var saltedPassword, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saltedPassword = crypto_1.default.randomBytes(8).toString("hex");
                        return [4 /*yield*/, this.scrypt(password, saltedPassword, 64)];
                    case 1:
                        buffer = _a.sent();
                        return [2 /*return*/, buffer.toString("hex") + "." + saltedPassword];
                }
            });
        });
    };
    return Validation;
}());
exports.default = Validation;
