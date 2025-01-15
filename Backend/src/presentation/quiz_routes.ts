import { Application, Request, Response } from "express";
import { Quiz_logic } from "../aplication/quiz_logic";

export class Quiz_routes{
    app: Application;
    rota_quiz: string = '/quiz';
    rota_pergunta : string = '/pergunta/:id'

    quiz_logic = new Quiz_logic();

    constructor(app: Application){
        this.app = app;
        this.iniciarRotas();
    }

    iniciarRotas(): Application{
        this.app.route(this.rota_quiz)
        .get((req: Request,res:Response)=> {
            let quiz = this.quiz_logic.obter_quiz();
            res.json(quiz);
        })
        this.app.route(this.rota_pergunta)
        .get((req: Request,res:Response)=> {
            let id_pergunta = Number(req.params.id);
            let pergunta = this.quiz_logic.obter_pergunta(id_pergunta);
            res.json(pergunta);
        })

        return this.app;
    }
}