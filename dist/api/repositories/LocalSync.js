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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = __importDefault(require("../database/Database"));
var LocalSync = /** @class */ (function () {
    function LocalSync() {
        this.db = Database_1.default.getInstance();
    }
    LocalSync.prototype.findOne = function (searchParams) {
        return __awaiter(this, void 0, void 0, function () {
            var tableName, fieldName, props, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tableName = searchParams.table;
                        delete searchParams[tableName];
                        fieldName = Object.keys(searchParams)[1];
                        return [4 /*yield*/, this.db.query("SELECT * FROM " + tableName + " WHERE " + fieldName + "='" + searchParams[fieldName] + "'")];
                    case 1:
                        props = (_a.sent())[0];
                        if (!props) {
                            throw new Error("Register not found in " + tableName);
                        }
                        return [2 /*return*/, props];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LocalSync.prototype.find = function (searchParams) {
        return __awaiter(this, void 0, void 0, function () {
            var tableName, fieldNames, whereStatement, _i, fieldNames_1, field, props, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tableName = searchParams.table;
                        delete searchParams.table;
                        fieldNames = Object.keys(searchParams);
                        whereStatement = [];
                        for (_i = 0, fieldNames_1 = fieldNames; _i < fieldNames_1.length; _i++) {
                            field = fieldNames_1[_i];
                            whereStatement = __spreadArrays(whereStatement, [
                                field + "='" + searchParams[field] + "'"
                            ]);
                        }
                        return [4 /*yield*/, this.db.query("SELECT * FROM " + tableName + " WHERE " + whereStatement.join("AND "))];
                    case 1:
                        props = _a.sent();
                        if (!props) {
                            throw new Error("Register not found in " + tableName);
                        }
                        return [2 /*return*/, props];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LocalSync;
}());
exports.default = LocalSync;
