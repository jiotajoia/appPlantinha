import { Application, Request, Response } from "express";
import { Historico_logic } from "../aplication/historico_logic";

export class Historico_routes{
    app: Application;
    rota_historico: string = '/user/:id/historico';

    historico_logic = new Historico_logic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota_historico)
        .get((req: Request,res:Response)=> {
            let id = Number(req.params.id);
            let historico = this.historico_logic.obter_historico(id);
            res.json(historico);
        })
        .delete((req: Request,res:Response)=> {
            let id = Number(req.params.id);
            let message = this.historico_logic.limpar_historico(id);
            res.json(message);
        })

        return this.app;
    }
}