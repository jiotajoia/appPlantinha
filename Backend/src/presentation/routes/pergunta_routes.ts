import { Application} from "express";
import { PerguntaController } from "../controllers/pergunta.controller";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";
import { PerguntaRepoFirebase } from "../../persistence/pergunta_repo";

export class PerguntaRoutes{
    app: Application;
    rotaPergunta : string = '/pergunta/:id'
    perguntaRepofirebase: PerguntaRepoFirebase = new PerguntaRepoFirebase(); 

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas(); 
    }

    iniciarRotas(): Application{
        const controller: PerguntaController = new PerguntaController(new ObterPerguntaUseCase(this.perguntaRepofirebase));
        
        this.app.route(this.rotaPergunta).get(controller.obterPergunta);

        return this.app;
    }
}