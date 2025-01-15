import { Application , Request, Response} from "express";
import { ImagemLogic } from "../../aplication/Imagem_logic";

export class ImagemRoutes{
    app: Application;
    rotaImagem: string = '/user/{id}/imagem';

    imagemLogic: ImagemLogic = new ImagemLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rotaImagem)
        .post((req: Request,res:Response)=> {
            let idUser = Number(req.params.id);
            let imagem = req.body;
            let resultado = this.imagemLogic.reconhecimento(idUser,imagem);
            res.json(resultado);
        })

        return this.app
    }
}