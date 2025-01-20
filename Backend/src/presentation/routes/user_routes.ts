import { Application} from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { AlterarUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_usuario.usecase";

export class UserRoutes{
    app: Application;
    rota: string = '/user';
    userGateway!: UserGateway;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: UsuarioController = new UsuarioController(new CriarUsuarioUseCase(this.userGateway), new ObterUsuarioUseCase(this.userGateway), new DeletarUsuarioUseCase(this.userGateway), new AlterarUsuarioUseCase(this.userGateway));
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);

        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario).patch(controller.alterarUsuario);

        return this.app;
    }
}