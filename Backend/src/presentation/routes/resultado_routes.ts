import { Application, Request, Response } from "express";
import { ResultadoLogic } from "../../aplication/resultado_logic";

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
        this.app.route(this.rotaUserResult)
        .patch((req: Request,res:Response)=> {
            let idUser = Number(req.params.id_user);
            let idResult = Number(req.params.id_resultado);
            let respostas: string[] = req.body;

            let resultado = this.resultadoLogic.preencherResult(idUser,idResult,respostas);
            res.json(resultado);
        })

        this.app.route(this.rotaResultado)
        .get((req: Request,res:Response)=> {
            let idResult = Number(req.params.id);
            let resultado = this.resultadoLogic.obterResult(idResult);
            res.json(resultado);
        })
        .delete((req: Request,res:Response)=> {
            let idResult = Number(req.params.id);
            let message = this.resultadoLogic.deletarResult(idResult);
            res.json(message)
        })

        return this.app;
    }
}