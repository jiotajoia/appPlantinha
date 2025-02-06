"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password_routes = void 0;
var password_controllers_1 = require("../controllers/password.controllers");
var editar_senha_usecase_1 = require("../../aplication/useCasesPassword/editar_senha.usecase");
var verify_code_usecase_1 = require("../../aplication/useCasesPassword/verify_code.usecase");
var send_code_usecase_1 = require("../../aplication/useCasesPassword/send_code.usecase");
var Password_routes = /** @class */ (function () {
    function Password_routes(app) {
        this.rotaReset = '/reset-password';
        this.rotaVerify = '/verify-code';
        this.rotaSend = '/send-code';
        this.app = app;
        this.iniciarRotas();
    }
    Password_routes.prototype.iniciarRotas = function () {
        var controler = new password_controllers_1.PasswordController(new editar_senha_usecase_1.EditarSenhaUseCase(), new verify_code_usecase_1.VerifyCodeUseCase(), new send_code_usecase_1.SendCodeUseCase());
        this.app.route(this.rotaReset).post(controler.resetPassword);
        this.app.route(this.rotaVerify).post(controler.verifyCode);
        this.app.route(this.rotaSend).post(controler.sendCode);
        return this.app;
    };
    return Password_routes;
}());
exports.Password_routes = Password_routes;
