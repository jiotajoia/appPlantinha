import { UsuarioController } from "../controllers/usuario.controller.js";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase.js";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase.js";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase.js";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase.js";
import { AlterarNomeUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_nome_usuario.usecase.js";
import { AlterarSenhaUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_senha_usuario.usecase.js";
export class UserRoutes {
    app;
    rota = '/user';
    userRepoFirebase = new UserRepoFirebase();
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new UsuarioController(new CriarUsuarioUseCase(this.userRepoFirebase), new ObterUsuarioUseCase(this.userRepoFirebase), new DeletarUsuarioUseCase(this.userRepoFirebase), new AlterarNomeUsuarioUseCase(this.userRepoFirebase), new AlterarSenhaUsuarioUseCase(this.userRepoFirebase));
        this.app.route(this.rota).post(controller.criarUsuario);
        this.app.route(this.rota + '/obter').post(controller.obterUsuario);
        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario);
        this.app.route(this.rota + '/:id/alterarNome').patch(controller.alterarNomeUsuario);
        this.app.route(this.rota + '/:id/alterarSenha').patch(controller.alterarSenhaUsuario);
        return this.app;
    }
}
