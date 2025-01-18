import { Application, Request, Response } from "express";
import { UserLogic } from "../../aplication/user_logic";
import { UsuarioController } from "../controllers/usuario.controller";
import { CriarUsuarioCommand } from "../../aplication/useCasesUsuario/criar_usuario.command";
import { UserRepo } from "../../domain/repositories/user_repo";
import { ObterUsuarioCommand } from "../../aplication/useCasesUsuario/obter_usuario.command";
import { DeletarUsuarioCommand } from "../../aplication/useCasesUsuario/deletar_usuario.command";
import { AlterarUsuarioCommand } from "../../aplication/useCasesUsuario/alterar_usuario.command";

export class UserRoutes{
    app: Application;
    rota: string = '/user';
    repositorio!: UserRepo;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: UsuarioController = new UsuarioController(new CriarUsuarioCommand(this.repositorio), new ObterUsuarioCommand(this.repositorio), new DeletarUsuarioCommand(this.repositorio), new AlterarUsuarioCommand(this.repositorio));
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);

        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario).patch(controller.alterarUsuario);

        return this.app;
    }
}