import { Application, Request, Response } from "express";
import { UserLogic } from "../../aplication/user_logic";
import { UsuarioController } from "../controllers/usuario.controller";

export class UserRoutes{
    app: Application;
    rota: string = '/user';

    userLogic: UserLogic = new UserLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: UsuarioController = new UsuarioController(this.userLogic);
        this.app.route(this.rota).post(controller.criarUsuario).get(controller.obterUsuario);

        this.app.route(this.rota + '/:id').delete(controller.deletarUsuario).patch(controller.alterarUsuario);

        return this.app;
    }
}