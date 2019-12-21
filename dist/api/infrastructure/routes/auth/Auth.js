"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = /** @class */ (function () {
    function Auth(router) {
        this.router = router;
        this.loginRoute();
        this.logoutRoute();
        this.signupRoute();
    }
    Auth.prototype.loginRoute = function () {
        this.router.get('/login', function (req, res) {
            var _a = req.body, email = _a.email, password = _a.password;
            res.send({ email: email, password: password });
        });
    };
    Auth.prototype.logoutRoute = function () {
        this.router.get('/logout', function (req, res) {
            res.send("Logged out");
        });
    };
    Auth.prototype.signupRoute = function () {
        this.router.post('/signup', function (req, res) {
            var _a = req.body, email = _a.email, password = _a.password;
            res.send({ email: email, password: password });
        });
    };
    return Auth;
}());
exports.default = Auth;
