"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var usuario_controller_1 = require("../controllers/usuario.controller");
var criar_usuario_usecase_1 = require("../../aplication/useCasesUsuario/criar_usuario.usecase");
var obter_usuario_usecase_1 = require("../../aplication/useCasesUsuario/obter_usuario.usecase");
var deletar_usuario_usecase_1 = require("../../aplication/useCasesUsuario/deletar_usuario.usecase");
var alterar_usuario_usecase_1 = require("../../aplication/useCasesUsuario/alterar_usuario.usecase");
var UserRoutes = /** @class */ (function () {
    function UserRoutes(app) {
        this.rota = '/user';
        this.app = app;
        this.iniciarRotas();
    }
    UserRoutes.prototype.iniciarRotas = function () {
        var controller = new usuario_controller_1.UsuarioController(new criar_usuario_usecase_1.CriarUsuarioUseCase(this.userGateway), new obter_usuario_usecase_1.ObterUsuarioUseCase(this.userGateway), new deletar_usuario_usecase_1.DeletarUsuarioUseCase(this.userGateway), new alterar_usuario_usecase_1.AlterarUsuarioUseCase(this.userGateway));
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);
        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario).patch(controller.alterarUsuario);
        return this.app;
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
