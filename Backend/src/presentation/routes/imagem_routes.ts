import { Application } from "express";
import { ImagemController } from "../controllers/imagem.controller";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase";

export class ImagemRoutes{
    app: Application;
    rotaImagem: string = '/user/:id/imagem';

    userGateway!: UserGateway;
    resultGateway!: ResultadoGateway;

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ImagemController = new ImagemController(new ReconhecimentoUseCase(this.resultGateway, this.userGateway));
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        
        return this.app
    }
}