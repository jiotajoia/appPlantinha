import { Application, Request, Response } from "express";
import { ResultadoLogic } from "../../aplication/resultado_logic";
import { ResultadoBuscaController } from "../controllers/resultado_busca.controller";

export class ResultadoRoutes{
    app: Application;
    rotaResultado: string = '/resultado/:id';
    rotaUserResult: string = `/user/:id_user/${this.rotaResultado}`;

    resultadoLogic: ResultadoLogic = new ResultadoLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ResultadoBuscaController = new ResultadoBuscaController(this.resultadoLogic);
        this.app.route(this.rotaUserResult).patch(controller.preencherResult);

        this.app.route(this.rotaResultado).get(controller.obterResult).delete(controller.deletarResult);

        return this.app;
    }
}