import { Application, Request, Response } from "express";
import { Resultado_logic } from "../aplication/resultado_logic";

export class Resultado_routes{
    app: Application;
    rota_resultado: string = '/resultado/:id';
    rota_user_result: string = '/user/:id_user/resultado/:id_resultado';

    resultado_logic = new Resultado_logic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota_user_result)
        .patch((req: Request,res:Response)=> {
            let id_user = Number(req.params.id_user);
            let id_result = Number(req.params.id_resultado);
            let respostas: string[] = req.body;

            let resultado = this.resultado_logic.preencher_result(id_user,id_result,respostas);
            res.json(resultado);
        })

        this.app.route(this.rota_resultado)
        .get((req: Request,res:Response)=> {
            let id_result = Number(req.params.id);
            let resultado = this.resultado_logic.obter_result(id_result);
            res.json(resultado);
        })
        .delete((req: Request,res:Response)=> {
            let id_result = Number(req.params.id);
            let message = this.resultado_logic.deletar_result(id_result);
            res.json(message)
        })

        return this.app;
    }
}