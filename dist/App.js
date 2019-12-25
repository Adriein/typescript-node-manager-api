"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var body_parser_1 = __importDefault(require("body-parser"));
var AuthRoutes_1 = __importDefault(require("./api/routes/auth/AuthRoutes"));
var AdminRoutes_1 = __importDefault(require("./api/routes/admin/AdminRoutes"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.router = express_1.default.Router();
    }
    App.prototype.init = function () {
        this.setUpEnvironment();
        this.setUpMiddelwares();
        this.setUpRoutes();
        this.startServer();
    };
    App.prototype.setUpEnvironment = function () {
        this.app.set("port", process.env.PORT || 3000);
        console.log("App Environment: PORT: " + this.app.get("port") + " CONFIG: DEV ");
    };
    App.prototype.setUpMiddelwares = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_session_1.default({ keys: ['fjrufjhruf'] }));
    };
    App.prototype.setUpRoutes = function () {
        var authRoutes = new AuthRoutes_1.default(this.router);
        var adminRoutes = new AdminRoutes_1.default(this.router);
        this.app.use(authRoutes.router);
    };
    App.prototype.startServer = function () {
        this.app.listen(this.app.get("port"), function () {
            console.log("Server running...");
        });
    };
    return App;
}());
exports.default = App;
