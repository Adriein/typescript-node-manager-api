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
var User_1 = __importDefault(require("../../domain/models/User"));
var Validation_1 = __importDefault(require("../Validation"));
var express_validator_1 = require("express-validator");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes(router) {
        this.router = router;
        this.validator = new Validation_1.default();
        this.user = User_1.default.buildUser({});
        this.loginRoute();
        this.logoutRoute();
        this.signupRoute();
    }
    AuthRoutes.prototype.loginRoute = function () {
        var _this = this;
        this.router.get("/login", [this.validator.requireEmailExists, this.validator.requireValidPassword], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, email;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.send(errors)];
                        }
                        email = req.body.email;
                        return [4 /*yield*/, this.user.findOne({ table: "user_profile", email: email })];
                    case 1:
                        _b.sent();
                        req.session.userId = this.user.get("id");
                        return [2 /*return*/, res.send("You are logged in with id: " + ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId))];
                }
            });
        }); });
    };
    AuthRoutes.prototype.logoutRoute = function () {
        this.router.get("/logout", function (req, res) {
            req.session = undefined;
            res.send("Logged out");
        });
    };
    AuthRoutes.prototype.signupRoute = function () {
        var _this = this;
        this.router.post("/signup", [this.validator.requireEmail, this.validator.requirePassword], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var errors, _a, email, pass, password, user_status, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = express_validator_1.validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, res.send(errors)];
                        }
                        _a = req.body, email = _a.email, pass = _a.pass;
                        return [4 /*yield*/, this.validator.encryptPassword(pass)];
                    case 1:
                        password = _b.sent();
                        user_status = 1;
                        this.user.set({ email: email, password: password, user_status: user_status });
                        return [4 /*yield*/, this.user.save()];
                    case 2:
                        id = _b.sent();
                        req.session.userId = id;
                        return [2 /*return*/, res.send("The user created correctly")];
                }
            });
        }); });
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
