import { Application} from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { AlterarNomeUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_nome_usuario.usecase";
import { AlterarSenhaUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_senha_usuario.usecase";

export class UserRoutes{
    app: Application;
    rota: string = '/user';
    userRepoFirebase: UserRepoFirebase = new UserRepoFirebase();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: UsuarioController = new UsuarioController(new CriarUsuarioUseCase(this.userRepoFirebase), new ObterUsuarioUseCase(this.userRepoFirebase), new DeletarUsuarioUseCase(this.userRepoFirebase), new AlterarNomeUsuarioUseCase(this.userRepoFirebase), new AlterarSenhaUsuarioUseCase(this.userRepoFirebase));
        
        this.app.route(this.rota).post(controller.criarUsuario);
        this.app.route(this.rota +'/obter').post(controller.obterUsuario);

        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario);

        this.app.route(this.rota + '/:id/alterarNome').patch(controller.alterarNomeUsuario);
        this.app.route(this.rota + '/:id/alterarSenha').patch(controller.alterarSenhaUsuario);
        
        return this.app;
    }
}