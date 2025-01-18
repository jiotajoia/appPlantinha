import { Application , Request, Response} from "express";
import { ImagemLogic } from "../../aplication/Imagem_logic";
import { ImagemController } from "../controllers/imagem.controller";

export class ImagemRoutes{
    app: Application;
    rotaImagem: string = '/user/:id/imagem';

    imagemLogic: ImagemLogic = new ImagemLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ImagemController = new ImagemController(this.imagemLogic);
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        
        return this.app
    }
}