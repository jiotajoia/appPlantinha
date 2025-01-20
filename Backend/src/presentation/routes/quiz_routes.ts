import { Application} from "express";
import { QuizController } from "../controllers/quiz.controller";
import { ObterQuizUseCase } from "../../aplication/useCasesQuiz/obter_quiz.usecase";
import { ObterPerguntaUseCase } from "../../aplication/useCasesQuiz/obter_pergunta.usecase";
import { PerguntaGateway } from "../../domain/gateways/pergunta.gateway";

export class QuizRoutes{
    app: Application;
    rotaQuiz: string = '/quiz';
    rotaPergunta : string = '/pergunta/:id'
    perguntaGateway!: PerguntaGateway; 

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: QuizController = new QuizController(new ObterQuizUseCase(), new ObterPerguntaUseCase(this.perguntaGateway));
        this.app.route(this.rotaQuiz).get(controller.obterQuiz);

        this.app.route(this.rotaPergunta).get(controller.obterPergunta);

        return this.app;
    }
}