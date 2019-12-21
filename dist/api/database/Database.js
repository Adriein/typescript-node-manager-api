"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var util_1 = __importDefault(require("util"));
var Database = /** @class */ (function () {
    function Database() {
        this.connection = this.setUpDataBase();
    }
    Database.getInstance = function () {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    };
    Database.prototype.setUpDataBase = function () {
        return mysql_1.default.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "movie_db"
        });
    };
    Database.prototype.query = function (sqlStatement) {
        return util_1.default
            .promisify(this.connection.query)
            .call(this.connection, sqlStatement);
    };
    return Database;
}());
exports.default = Database;
