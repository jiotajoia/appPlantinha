import { Application, Request, Response } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.command copy";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.command copy";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.command copy";
import { AlterarUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_usuario.command copy";

export class UserRoutes{
    app: Application;
    rota: string = '/user';
    repositorio!: UserGateway;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: UsuarioController = new UsuarioController(new CriarUsuarioUseCase(this.repositorio), new ObterUsuarioUseCase(this.repositorio), new DeletarUsuarioUseCase(this.repositorio), new AlterarUsuarioUseCase(this.repositorio));
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);

        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario).patch(controller.alterarUsuario);

        return this.app;
    }
}