import { UsuarioController } from "../controllers/usuario.controller";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { AlterarNomeUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_nome_usuario.usecase";
import { AlterarSenhaUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_senha_usuario.usecase";
export class UserRoutes {
    app;
    rota = '/user';
    userRepoFirebase;
    constructor(app) {
        this.app = app;
        this.iniciarRotas();
    }
    iniciarRotas() {
        const controller = new UsuarioController(new CriarUsuarioUseCase(this.userRepoFirebase), new ObterUsuarioUseCase(this.userRepoFirebase), new DeletarUsuarioUseCase(this.userRepoFirebase), new AlterarNomeUsuarioUseCase(this.userRepoFirebase), new AlterarSenhaUsuarioUseCase(this.userRepoFirebase));
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);
        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario);
        this.app.route(this.rota + '/:id/alterarNome').patch(controller.alterarNomeUsuario);
        this.app.route(this.rota + '/:id/alterarSenha').patch(controller.alterarNomeUsuario);
        return this.app;
    }
}
