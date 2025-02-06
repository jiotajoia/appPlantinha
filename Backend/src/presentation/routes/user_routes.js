"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
var usuario_controller_1 = require("../controllers/usuario.controller");
var criar_usuario_usecase_1 = require("../../aplication/useCasesUsuario/criar_usuario.usecase");
var obter_usuario_usecase_1 = require("../../aplication/useCasesUsuario/obter_usuario.usecase");
var deletar_usuario_usecase_1 = require("../../aplication/useCasesUsuario/deletar_usuario.usecase");
var user_repo_firebase_1 = require("../../persistence/user_repo_firebase");
var alterar_nome_usuario_usecase_1 = require("../../aplication/useCasesUsuario/alterar_nome_usuario.usecase");
var alterar_senha_usuario_usecase_1 = require("../../aplication/useCasesUsuario/alterar_senha_usuario.usecase");
var UserRoutes = /** @class */ (function () {
    function UserRoutes(app) {
        this.rota = '/user';
        this.userRepoFirebase = new user_repo_firebase_1.UserRepoFirebase();
        this.app = app;
        this.iniciarRotas();
    }
    UserRoutes.prototype.iniciarRotas = function () {
        var controller = new usuario_controller_1.UsuarioController(new criar_usuario_usecase_1.CriarUsuarioUseCase(this.userRepoFirebase), new obter_usuario_usecase_1.ObterUsuarioUseCase(this.userRepoFirebase), new deletar_usuario_usecase_1.DeletarUsuarioUseCase(this.userRepoFirebase), new alterar_nome_usuario_usecase_1.AlterarNomeUsuarioUseCase(this.userRepoFirebase), new alterar_senha_usuario_usecase_1.AlterarSenhaUsuarioUseCase(this.userRepoFirebase));
        this.app.route(this.rota).post(controller.criarUsuario);
        this.app.route(this.rota + '/obter').post(controller.obterUsuario);
        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario);
        this.app.route(this.rota + '/:id/alterarNome').patch(controller.alterarNomeUsuario);
        this.app.route(this.rota + '/:id/alterarSenha').patch(controller.alterarSenhaUsuario);
        return this.app;
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
