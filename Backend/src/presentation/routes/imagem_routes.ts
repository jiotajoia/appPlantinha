import { Application } from "express";
import { ImagemController } from "../controllers/imagem.controller";
import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export class ImagemRoutes{
    app: Application;
    rotaImagem: string = '/user/:id/imagem';

    userGateway: UserRepoFirebase = new UserRepoFirebase();
    resultGateway: ResultRepoFirebase = new ResultRepoFirebase();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: ImagemController = new ImagemController(new ReconhecimentoUseCase(this.resultGateway, this.userGateway));
        this.app.route(this.rotaImagem).post(controller.reconhecimento);
        
        return this.app;
    }
}