import { Application, Request, Response } from "express";
import { HistoricoLogic } from "../../aplication/historico_logic";
import { HistoricoController } from "../controllers/historico.controller";

export class HistoricoRoutes{
    app: Application;
    rotaHistorico: string = '/user/:id/historico';

    historicoLogic: HistoricoLogic = new HistoricoLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: HistoricoController = new HistoricoController(this.historicoLogic);
        this.app.route(this.rotaHistorico).get(controller.obterHistorico).delete(controller.limparHistorico)

        return this.app;
    }
}