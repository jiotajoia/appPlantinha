import { Application} from "express";
import { PerguntaController } from "../controllers/pergunta.controller";
import { PerguntaGateway } from "../../domain/gateways/pergunta.gateway";
import { ObterPerguntaUseCase } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";

export class PerguntaRoutes{
    app: Application;
    rotaPergunta : string = '/pergunta/:id'
    perguntaGateway!: PerguntaGateway; 

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: PerguntaController = new PerguntaController(new ObterPerguntaUseCase(this.perguntaGateway));
        
        this.app.route(this.rotaPergunta).get(controller.obterPergunta);

        return this.app;
    }
}