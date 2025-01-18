import { Application, Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";
import { QuizController } from "../controllers/quiz.controller";

export class QuizRoutes{
    app: Application;
    rotaQuiz: string = '/quiz';
    rotaPergunta : string = '/pergunta/:id'

    quizLogic: QuizLogic = new QuizLogic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        const controller: QuizController = new QuizController(this.quizLogic);
        this.app.route(this.rotaQuiz).get(controller.obterQuiz);

        this.app.route(this.rotaPergunta).get(controller.obterPergunta);

        return this.app;
    }
}