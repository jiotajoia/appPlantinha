import { Application, Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";
import { QuizController } from "../controllers/quiz.controller";
import { PerguntaRepo } from "../../domain/repositories/pergunta_repo";
import { ObterQuizCommand } from "../../aplication/useCasesQuiz/obter_quiz.command";
import { ObterPerguntaCommand } from "../../aplication/useCasesQuiz/obter_pergunta.command";

export class QuizRoutes{
    app: Application;
    rotaQuiz: string = '/quiz';
    rotaPergunta : string = '/pergunta/:id'
    perguntaRepo!: PerguntaRepo; 

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: QuizController = new QuizController(new ObterQuizCommand(), new ObterPerguntaCommand(this.perguntaRepo));
        this.app.route(this.rotaQuiz).get(controller.obterQuiz);

        this.app.route(this.rotaPergunta).get(controller.obterPergunta);

        return this.app;
    }
}