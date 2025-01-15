import { Application , Request, Response} from "express";
import { Imagem_logic } from "../aplication/Imagem_logic";

export class Imagem_routes{
    app: Application;
    rota: string = '/user/{id}/imagem';

    imagem_logic = new Imagem_logic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota)
        .post((req: Request,res:Response)=> {
            let id_user = Number(req.params.id);
            let imagem = req.body;
            let resultado = this.imagem_logic.reconhecimento(id_user,imagem);
            res.json(resultado);
        })

        return this.app
    }
}