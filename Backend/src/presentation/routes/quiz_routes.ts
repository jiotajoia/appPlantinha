import { Application, Request, Response } from "express";
import { QuizLogic } from "../../aplication/quiz_logic";

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
        this.app.route(this.rotaQuiz)
        .get((req: Request,res:Response)=> {
            let quiz = this.quizLogic.obterQuiz();
            res.json(quiz);
        });

        this.app.route(this.rotaPergunta)
        .get((req: Request,res:Response)=> {
            let idPergunta = Number(req.params.id);
            let pergunta = this.quizLogic.obterPergunta(idPergunta);
            res.json(pergunta);
        });

        return this.app;
    }
}