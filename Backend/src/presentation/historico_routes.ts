import { Application, Request, Response } from "express";
import { HistoricoLogic } from "../aplication/historico_logic";

export class HistoricoRoutes{
    app: Application;
    rotaHistorico: string = '/user/:id/historico';

    historicoLogic: HistoricoLogic = new HistoricoLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rotaHistorico)
        .get((req: Request,res:Response)=> {
            let id = Number(req.params.id);
            let historico = this.historicoLogic.obterHistorico(id);
            res.json(historico);
        })
        .delete((req: Request,res:Response)=> {
            let id = Number(req.params.id);
            let message = this.historicoLogic.limparHistorico(id);
            res.json(message);
        })

        return this.app;
    }
}