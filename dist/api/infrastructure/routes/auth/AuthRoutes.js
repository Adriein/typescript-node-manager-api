"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes(router) {
        this.router = router;
        this.loginRoute();
        this.logoutRoute();
        this.signupRoute();
    }
    AuthRoutes.prototype.loginRoute = function () {
        this.router.get('/login', function (req, res) {
            var _a = req.body, email = _a.email, password = _a.password;
            res.send({ email: email, password: password });
        });
    };
    AuthRoutes.prototype.logoutRoute = function () {
        this.router.get('/logout', function (req, res) {
            res.send("Logged out");
        });
    };
    AuthRoutes.prototype.signupRoute = function () {
        this.router.post('/signup', function (req, res) {
            var _a = req.body, email = _a.email, password = _a.password;
            res.send({ email: email, password: password });
        });
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
